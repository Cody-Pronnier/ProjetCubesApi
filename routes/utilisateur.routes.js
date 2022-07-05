const express = require ('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller');
const auth = require('../middleware/auth');
const multer = require('multer')

router.get("/utilisateur",auth , utilisateurController.afficherUtilisateurs);
router.get("/utilisateur/monprofil",auth , utilisateurController.monProfil);
router.get("/utilisateur/:id",auth , utilisateurController.affichageUtilisateur);
router.get("/utilisateur/abonne",auth , utilisateurController.tousLesAbonnes);
router.post("/utilisateur",  utilisateurController.ajoutUtilisateur);
router.post("/connexion", utilisateurController.Login);
router.post("/deconnexion", auth, utilisateurController.Logout);
router.delete("/utilisateur/delete", auth, utilisateurController.suppresion);
router.patch("/utilisateur/update", auth, utilisateurController.updateUtilisateur);
router.patch("/utilisateur/follow/:id", auth, utilisateurController.followUser);

router.get("/utilisateur/:id/ressources",auth, utilisateurController.toutesRessourcesDeUtilisateur);
router.patch("utilisateur/:id/switch", auth, utilisateurController.switchCompteUtilisateur);


router.post('/utilisateur/:id/image', auth, utilisateurController.avatar);

router.post("/inscription", utilisateurController.ajoutUtilisateurInscription);

module.exports = router;