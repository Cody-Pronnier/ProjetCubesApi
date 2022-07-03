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

const storage = multer.diskStorage({
  destination : (req, file, cb)=> {
      cb(null, "./public")
  },
  filename : (req, file, cb)=> {
      var date = new Date().toLocaleDateString();
      cb(null, date+"-"+Math.round(Math.random() * 10000)+"-"+file.originalname)
  }
});
const fileFilter = (req, file, cb) =>{
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
      cb(null, true)
  } else {
      cb(new Error("l'image n'est pas acceptée"),false)
  }
}

const upload = multer({
  storage : storage,
  limits : {
      fileSize : 1024 * 1024 * 5
  },
  fileFilter : fileFilter
})

router.get('/utilisateur/:id/image', auth, utilisateurController.avatar);

router.post("/inscription", upload.single("image"), utilisateurController.ajoutUtilisateurInscription);

module.exports = router;