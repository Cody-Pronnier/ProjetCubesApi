const express = require ('express');
const router = express.Router();
const ressourceController = require('../controllers/ressource.controller');
const auth = require('../middleware/auth');
const multer = require('multer')

const storage = 
multer.diskStorage({
    destination : (req, file, cb)=> {
        cb(null, "./public/images/")
    },
    filename : (req, file, cb)=> {
        cb(null, Math.round(Math.random() * 10000)+"-"+file.originalname)
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


router.post("/ressource", auth, upload.single("image"), ressourceController.ajoutRessource);
router.get("/ressource", ressourceController.afficherRessources);
router.get("/ressource/:id/utilisateur", auth, ressourceController.ressourcesUtilisateur);
router.patch("/ressource/:id/reaction", auth, ressourceController.reactionRessource);
router.patch("/ressource/:id/switch", auth, ressourceController.switchRessource);
router.patch("/ressource/:id", auth, ressourceController.modifierRessource);
router.delete("/ressource/:id", auth, ressourceController.supprimerRessource);
router.post("/ressource/:id/commentaire", auth, ressourceController.ajoutCommentaire);

module.exports = router;