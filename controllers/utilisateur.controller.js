const UtilisateurModel = require('../models/Utilisateur')

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
    console.log(utilisateur);
    try {
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

  module.exports= {
    afficherUtilisateurs,
    ajoutUtilisateur,
    ajoutUtilisateurInscription,
    Login,
    Logout,
    profil,
    toutesRessourcesDeUtilisateur,
    switchCompteUtilisateur,
    follow
  };