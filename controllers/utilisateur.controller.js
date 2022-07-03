const UtilisateurModel = require('../models/Utilisateur')
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


  const ajoutUtilisateurInscription = async (req, res) => {
    const utilisateur = new UtilisateurModel(req.body);
    try {
      req.utilisateur.image = await sharp(req.file.buffer).resize({ width: 50, height: 50 }).png().toBuffer()
        await utilisateur.save();
        const token = await utilisateur.generateAuthToken();
        res.status(201).send({ utilisateur, token });
    } catch (e) {
        res.status(400).send(e);
    }
};


const Login = async (req, res) => {
  try {
      const utilisateur = await UtilisateurModel.findByCredentials(req.body.mail, req.body.mot_de_passe);
      const token = await utilisateur.generateAuthToken();
      res.send({ utilisateur, token })
  } catch (e) {
      res.status(400).send()
  }
};

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

const profil = async (req, res) => {
  res.send(req.utilisateur);
};

const toutesRessourcesDeUtilisateur = async (req, res) => {
  const user = await UtilisateurModel.find({ _id: req.params.id })
    .populate('ressources');
  console.log(user);
  if (!user) {
    res.status(404).send("Cet utilisateur n'existe pas.");
  }
  res.send(user);
};

// switch un compte non valid à valid ou inversement

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

// FONCTION POUR FOLLOW OU UNFOLLOW QUELQU'UN

const follow = async (req, res) => {
  const utilisateur = await UtilisateurModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!utilisateur) {
    res.status(404).send("Cet utilisateur n'existe pas.");
  } else {
    var idexistant = await AbonnementModel.find({ utilisateur: utilisateur._id, abonnement: '62a9da694dc6033c7098a68b' });
    if (idexistant == null || idexistant == '') {
      //ON CREE LE FOLLOW
      const follow = new AbonnementModel({ _id: new mongoose.Types.ObjectId(), utilisateur: utilisateur._id, abonnement: '62a9da694dc6033c7098a68b' });
      await follow.save();

      // ON INCREMENTE LE NOMBRE D'ABONNE
      utilisateur.nbdabonne++;
      await utilisateur.save();

      // ON INCREMENT LE NOMBRE D'ABONNEMENT
      var abonnement = await UtilisateurModel.findById({ _id: '62a9da694dc6033c7098a68b' });
      abonnement.nbdabonnement ++;
      await abonnement.save();

      res.send(follow, utilisateur, abonnement);
    } else {
      // On delete l'existance de l'id
      const unfollow = await AbonnementModel.findByIdAndDelete(idexistant);
      //On decremante le nombre dabonné
      utilisateur.nbdabonne --;
      await utilisateur.save();

      //On decremante le nombre dabonnement
      var abonnement = await UtilisateurModel.findById({ _id: '62a9da694dc6033c7098a68b' });
      abonnement.nbdabonnement--;
      await abonnement.save();

      res.status(200).send(unfollow, utilisateur, abonnement);
    }
  }
};

const modifUtilisateur = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['pseudo', 'description', 'mail', 'mot_de_passe']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Modifications invalides!' })
  }

  try {
      updates.forEach((update) => req.utilisateur[update] = req.body[update])
      await req.utilisateur.save()
      res.send(req.utilisateur)
  } catch (e) {
      res.status(400).send(e)
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




  module.exports= {
    afficherUtilisateurs,
    ajoutUtilisateur,
    ajoutUtilisateurInscription,
    Login,
    Logout,
    profil,
    toutesRessourcesDeUtilisateur,
    switchCompteUtilisateur,
    follow,
    modifUtilisateur,
    avatar
  };