


// Affiche tous les utilisateurs
const afficherUtilisateurs = async (req, res) => {
    const users = await UtilisateurModel.find({});
    res.send(users);
  };

  module.exports= {
    afficherUtilisateurs
  };