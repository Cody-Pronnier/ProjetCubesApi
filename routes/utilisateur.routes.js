const express = require ('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get("/utilisateur",auth , utilisateurController.afficherUtilisateurs);
router.get("/utilisateur/monprofil",auth , utilisateurController.monProfil);
router.get("/utilisateur/role",auth , utilisateurController.getRole);
router.get("/utilisateur/abonnement",auth , utilisateurController.monAbonnement);
router.get("/utilisateur/abonne",auth , utilisateurController.monAbonne);
router.get("/utilisateur/abonnementnoe",auth , utilisateurController.monAbonnementNoe);
router.get("/utilisateur/abonnenoe",auth , utilisateurController.monAbonneNoe);
router.get("/utilisateur/abonnement/:id",auth , utilisateurController.monAbonnementNoeById);
router.get("/utilisateur/abonne/:id",auth , utilisateurController.monAbonneNoeById);
router.get("/utilisateur/:id",auth , utilisateurController.affichageUtilisateur);
router.post("/utilisateur",  utilisateurController.ajoutUtilisateur);
router.post("/connexion", utilisateurController.Login);
router.post("/deconnexion", auth, utilisateurController.Logout);
router.delete("/utilisateur/delete", auth, utilisateurController.suppresion);
router.delete("/utilisateur/:id",auth , utilisateurController.deleteUtilisateurById);
router.patch("/utilisateur/update", auth, utilisateurController.updateUtilisateur);

router.patch("/utilisateur/follow/:id", auth, utilisateurController.followUser);

router.get("/utilisateur/:id/ressources",auth, utilisateurController.toutesRessourcesDeUtilisateur);
router.patch("/utilisateur/:id/switch", auth, utilisateurController.switchCompteUtilisateur);
router.patch("/utilisateur/:id", auth, utilisateurController.updateUtilisateurById);


router.post('/utilisateur/:id/image', auth, utilisateurController.avatar);

router.post("/inscription", utilisateurController.ajoutUtilisateurInscription);

module.exports = router;