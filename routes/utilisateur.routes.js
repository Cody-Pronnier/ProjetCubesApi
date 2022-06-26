const express = require ('express');
const router = express.Router();
const userController = require('../controllers/utilisateur.controller');
const auth = require('../middleware/auth');

router.get("/utilisateur", auth, userController.afficherUtilisateurs);
router.post("/utilisateur", userController.ajoutUtilisateur);
router.post("/inscription", userController.ajoutUtilisateurInscription);
router.post("/connexion", userController.Login);
router.post("/deconnexion", auth, userController.Logout);
router.get("/utilisateur/profil", auth, userController.profil);


module.exports = router;