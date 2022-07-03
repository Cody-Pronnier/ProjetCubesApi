const express = require ('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller');
const auth = require('../middleware/auth');
const multer = require('multer')

router.get("/utilisateur",auth , utilisateurController.afficherUtilisateurs);
router.post("/utilisateur",  utilisateurController.ajoutUtilisateur);
router.post("/connexion", utilisateurController.Login);
router.post("/deconnexion", auth, utilisateurController.Logout);
router.get("/utilisateur/profil", auth, utilisateurController.profil);
router.get("/utilisateur/:id/ressources",auth, utilisateurController.toutesRessourcesDeUtilisateur);
router.patch("utilisateur/:id/switch", auth, utilisateurController.switchCompteUtilisateur);
router.patch("utilisateur/:id/follow", auth, utilisateurController.follow);
router.patch("utilisateur/:id", auth, utilisateurController.modifUtilisateur);
router.post('/utilisateur/:id/image', auth, utilisateurController.avatar);


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Merci de mettre une image à télécharger'));
        }
        cb(undefined, true);
    }
  });

router.post("/inscription",  upload.single('image'), utilisateurController.ajoutUtilisateurInscription)

module.exports = router;