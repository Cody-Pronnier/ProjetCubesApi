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
router.get("/utilisateur/:id/ressources",auth, utilisateurController.toutesRessourcesDeUtilisateur);
router.patch("utilisateur/:id/switch", auth, utilisateurController.switchCompteUtilisateur);
router.patch("utilisateur/:id/follow", auth, utilisateurController.follow);
router.patch("utilisateur/:id", auth, utilisateurController.modifUtilisateur);

const upload = multer({
  limits: {
      fileSize: 1000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload an image'))
      }

      cb(undefined, true)
  }
})
router.post("/test", auth,  upload.single("test"), async (req, res) => {
  req.utilisateur.image = req.file.buffer
  await req.utilisateur.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message})
});
router.post('/utilisateur/:id/image', auth, utilisateurController.avatar);

router.post("/inscription", utilisateurController.ajoutUtilisateurInscription);

module.exports = router;