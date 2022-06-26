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


  module.exports= {
    afficherUtilisateurs,
    ajoutUtilisateur,
    ajoutUtilisateurInscription,
    Login,
    Logout
  };