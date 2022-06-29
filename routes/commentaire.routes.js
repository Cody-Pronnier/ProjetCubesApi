const express = require ('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaire.controller');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post("/commentaire", auth, commentaireController.ajoutCommentaire);
router.get("/commentaire", auth, commentaireController.afficherCommentaires);
router.get("/commentaire/:id", auth, commentaireController.afficherCommentaire);
router.patch("/commentaire/:id", auth, commentaireController.modifierCommentaire);
router.patch("/commentaire/:id/switch", auth, commentaireController.switchCommentaire);
router.delete("/commentaire/:id", auth, commentaireController.supprimerCommentaire);

module.exports = router;