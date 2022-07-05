const UtilisateurModel = require('../models/Utilisateur')
const RessourceModel = require("../models/Ressource");
const AbonnementModel = require("../models/Abonnement");
const sharp = require('sharp')


// Affiche tous les utilisateurs
const afficherUtilisateurs = async (req, res) => {
  const users = await UtilisateurModel.find({});
  res.send(users);
};


const ajoutUtilisateur = async (req, res) => {
  const utilisateur = new UtilisateurModel(req.body);
  await utilisateur.save();
  res.send(utilisateur);
};

// Fonction pour s'inscrire 
const ajoutUtilisateurInscription = async (req, res) => {
  console.log(req.body)
  const utilisateur = new UtilisateurModel(req.body);
  try {
    await utilisateur.save();
    const token = await utilisateur.generateAuthToken();
    res.status(201).send({ utilisateur, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// Fonction pour le connecter
const Login = async (req, res) => {
  try {
    const utilisateur = await UtilisateurModel.findByCredentials(req.body.mail, req.body.mot_de_passe);
    const token = await utilisateur.generateAuthToken();
    const ressource = await RessourceModel.find({ utilisateur: utilisateur._id })
    utilisateur.ressources = ressource
    res.send({ utilisateur, token })
  } catch (e) {
    res.status(400).send("Erreur de login")
  }
};


//Fonction pour se déconnecter
const Logout = async (req, res) => {
  try {
    req.utilisateur.tokens = req.utilisateur.tokens.filter((token) => {
      return token.token !== req.token;
    })
    await req.utilisateur.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};


// Fonction qui récupère toutes les ressources d'un utilisateur
const toutesRessourcesDeUtilisateur = async (req, res) => {
  const user = await UtilisateurModel.find({ _id: req.params.id })
    .populate('ressources');
  console.log(user);
  if (!user) {
    res.status(404).send("Cet utilisateur n'existe pas.");
  }
  res.send(user);
};

// Switch un compte non valid à valid ou inversement
const switchCompteUtilisateur = async (req, res) => {
  const user = await UtilisateurModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!user) {
    res.status(404).send("Cet utilisateur n'existe pas.");
  }
  if (user.compte_actif === true) {
    user.compte_actif = false;
  } else {
    user.compte_actif = true;
  }

  await user.save();
  res.send(user);
};


//Fonction pour follow/unfollow un utilisateur
const followUser = async (req, res) => {
  const utilisateur = await UtilisateurModel.findById(
   req.params.id
)
  if (!utilisateur) {
    res.status(404).send("Cet utilisateur n'existe pas.");
  } else {
    var idexistant = await AbonnementModel.find({ utilisateur: utilisateur._id, abonnement: req.utilisateur._id });
    if (idexistant == null || idexistant == '') {
      const follow = new AbonnementModel({ utilisateur: utilisateur._id, abonnement:  req.utilisateur._id });
      await follow.save();


      // ON INCREMENTE LE NOMBRE D'ABONNE
      utilisateur.nbdabonne ++;
      await utilisateur.save();


      // ON INCREMENT LE NOMBRE D'ABONNEMENT
      var abonnement = await UtilisateurModel.findById({ _id: req.utilisateur._id });
      abonnement.nbdabonnement++;
      await abonnement.save();

      res.status(200).send('Follow réussi WP');
    }else{
      // On delete l'existance de l'id
      const unfollow = await AbonnementModel.findByIdAndDelete(idexistant);

      //On decremante le nombre dabonné
      utilisateur.nbdabonne--;
      await utilisateur.save();


      //On decremante le nombre dabonnement
      var abonnement = await UtilisateurModel.findById(req.utilisateur);
      abonnement.nbdabonnement--;
      await abonnement.save();

      res.status(200).send('Unfollow réussi. Ca juge de ouf');
    }
  }
}


const avatar = async (req, res) => {
  try {
    const utilisateur = await UtilisateurModel.findById(req.params.id)

    if (!utilisateur || !utilisateur.image) {
      throw new Error()
    }

    res.set('Content-Type', 'image/png')
    res.send(utilisateur.image)
  } catch (e) {
    res.status(404).send()
  }
}


const monProfil = async( req, res) => {
  const ressource = await RessourceModel.find({ utilisateur: req.utilisateur._id})
  req.utilisateur.ressources = ressource
  res.status(200).send(req.utilisateur)
}

//Fonction qui supprime l'utilisateur connecté
const suppresion = async (req, res) => {
  await req.utilisateur.remove()
  res.send(req.utilisateur);
};

//FOnction pour mettre à jouer les 4 données d'un utilisateur
const updateUtilisateur = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['pseudo', 'description', 'mail', 'image']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Modifications invalides!' })
  }

  try {
    updates.forEach((update) => req.utilisateur[update] = req.body[update])
    console.log(req.utilisateur);
    await req.utilisateur.save()
    res.send(req.utilisateur)
  } catch (e) {
    res.status(400).send(e)
  }

};


const monAbonnement = async( req, res) => {
  const abo = await AbonnementModel.find({ abonnement: req.utilisateur.id})
  .populate('abonnement')
  res.status(200).send(abo)
}

const monAbonne = async( req, res) => {
  const abo = await AbonnementModel.find({ utilisateur: req.utilisateur.id})
  .populate('utilisateur')
  res.status(200).send(abo)
}

const affichageUtilisateur = async(req, res) => {
  const utilisateur = await UtilisateurModel.findById(req.params.id)
  res.status(200).send(utilisateur);
}


module.exports = {
  afficherUtilisateurs,
  ajoutUtilisateur,
  ajoutUtilisateurInscription,
  Login,
  Logout,
  toutesRessourcesDeUtilisateur,
  switchCompteUtilisateur,
  avatar,
  suppresion,
  updateUtilisateur,
  followUser,
  affichageUtilisateur,
  monProfil,
  monAbonnement,
  monAbonne
};