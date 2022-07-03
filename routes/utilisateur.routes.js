const express = require ('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('multer')
const sharp = require('sharp')

router.get("/utilisateur",auth , utilisateurController.afficherUtilisateurs);
router.post("/utilisateur",  utilisateurController.ajoutUtilisateur);
router.post("/connexion", utilisateurController.Login);
router.post("/deconnexion", auth, utilisateurController.Logout);
router.get("/utilisateur/profil", auth, utilisateurController.profil);
router.delete("/utilisateur/delete", auth, utilisateurController.suppresion);
router.patch("/utilisateur/update", auth, utilisateurController.updateUtilisateur);


router.get("/utilisateur/:id/ressources",auth, utilisateurController.toutesRessourcesDeUtilisateur);
router.patch("utilisateur/:id/switch", auth, utilisateurController.switchCompteUtilisateur);
router.patch("utilisateur/:id/follow", auth, utilisateurController.follow);



const upload = multer({
  dest: 'public'})

router.post("/test",  upload.single("test"), (req, res) => {
  res.send
});
router.post('/utilisateur/:id/image', auth, utilisateurController.avatar);

router.post("/inscription", utilisateurController.ajoutUtilisateurInscription);

module.exports = router;