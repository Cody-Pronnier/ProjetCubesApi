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
            return cb(new Error('Merci de mettre une image à télécharger'));
        }
  
        cb(undefined, true);
    }
  });
//   const test = async (req, res) => {
//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
//     try {
//     req.utilisateur.image = buffer
//     await req.utilisateur.save()
//     res.send();
//     }   catch (e) {
//     res.status(400).send(e);
//     }
//   };
router.post('/utilisateur/profil/image', upload.single('image'), async (req, res) => {
  req.utilisateur.image = req.file.buffer
  await req.utilisateur.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message})
})

router.post("/inscription", utilisateurController.ajoutUtilisateurInscription, upload.single('image'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 50, height: 50 }).png().toBuffer()
  req.utilisateur.image = buffer
  await req.utilisateur.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message})
})

module.exports = router;