const express = require ('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller');
const auth = require('../middleware/auth');
const multer = require('multer')

router.get("/utilisateur",auth , utilisateurController.afficherUtilisateurs);
router.get("/utilisateur/:id",auth , utilisateurController.affichageUtilisateur);
router.get("/utilisateur/abonne",auth , utilisateurController.tousLesAbonnes);
router.post("/utilisateur",  utilisateurController.ajoutUtilisateur);
router.post("/connexion", utilisateurController.Login);
router.post("/deconnexion", auth, utilisateurController.Logout);
router.get("/utilisateur/profil", auth, utilisateurController.profil);
router.delete("/utilisateur/delete", auth, utilisateurController.suppresion);
router.patch("/utilisateur/update", auth, utilisateurController.updateUtilisateur);
router.patch("/utilisateur/follow/:id", auth, utilisateurController.followUser);

router.get("/utilisateur/:id/ressources",auth, utilisateurController.toutesRessourcesDeUtilisateur);
router.patch("utilisateur/:id/switch", auth, utilisateurController.switchCompteUtilisateur);

const storage = multer.diskStorage({
  destination : (req, file, cb)=>{
    cb(null, "../public/images")
  },
  filename : (req, file, cb)=> {
    var date = new Date().toLocaleDateString();
    cb(null, date+"-"+Math.round(Math.random() * 10000) + "-"+file.originalname)
  }
})

const fileFilter = (req, file, cb) =>{
  if(file.mimetype === image/jpeg || file.minetype === "image/png"){
cb(null, true)
  } else {
    cb(new Error("L'image n'est pas acceptée"), false)
  }
}


const upload = multer({
  storage: storage,
limits : {
  fileSize : 1024 * 1024 * 5
},
fileFilter : fileFilter
})

router.post("/test",  upload.single("test"), (req, res) => {
  res.send
});
router.post('/utilisateur/:id/image', auth, utilisateurController.avatar);

router.post("/inscription", utilisateurController.ajoutUtilisateurInscription);

module.exports = router;