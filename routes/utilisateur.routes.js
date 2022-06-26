const express = require ('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller');
const auth = require('../middleware/auth');

router.get("/utilisateur", auth, utilisateurController.afficherUtilisateurs);
router.post("/utilisateur", utilisateurController.ajoutUtilisateur);
router.post("/inscription", utilisateurController.ajoutUtilisateurInscription);
router.post("/connexion", utilisateurController.Login);
router.post("/deconnexion", auth, utilisateurController.Logout);
router.get("/utilisateur/profil", auth, utilisateurController.profil);


module.exports = router;