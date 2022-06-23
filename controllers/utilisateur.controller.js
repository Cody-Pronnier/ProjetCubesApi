const UtilisateurModel = require('../models/Utilisateur')

// Affiche tous les utilisateurs
const afficherUtilisateurs = async (req, res) => {
    const users = await UtilisateurModel.find({});
    res.send(users);
  };

  const ajoutUtilisateur = async (req, res) => {
    const user = new UtilisateurModel(req.body);
    await user.save();
    res.send(user);
  };

  module.exports= {
    afficherUtilisateurs,
    ajoutUtilisateur
  };