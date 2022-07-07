const express = require ('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaire.controller');
const auth = require('../middleware/auth');



//Routes GET
router.get("/commentaire", auth, commentaireController.afficherCommentaires);
router.get("/commentaire/:id", auth, commentaireController.afficherCommentaire);
//Routes POST
router.post("/commentaire", auth, commentaireController.ajoutCommentaire);
//Routes PATCH
router.patch("/commentaire/:id", auth, commentaireController.modifierCommentaire);
router.patch("/commentaire/:id/switch", auth, commentaireController.switchCommentaire);
//Routes DELETE
router.delete("/commentaire/:id", auth, commentaireController.supprimerCommentaire);

module.exports = router;