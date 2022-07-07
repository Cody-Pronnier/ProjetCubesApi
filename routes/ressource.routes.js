const express = require ('express');
const router = express.Router();
const ressourceController = require('../controllers/ressource.controller');
const auth = require('../middleware/auth');


//Routes GET
router.get("/ressource", ressourceController.afficherRessources);
router.get("/ressource/:id/utilisateur", auth, ressourceController.ressourcesUtilisateur);
//Routes POST

//Routes PATCH
router.patch("/ressource/:id/reaction", auth, ressourceController.reactionRessource);
router.patch("/ressource/:id/switch", auth, ressourceController.switchRessource);
router.patch("/ressource/:id", auth, ressourceController.modifierRessource);
router.patch("/ressource/:id/commentaire", auth, ressourceController.ajoutCommentaire);
router.patch("/commentaire/reponse/:id", auth, ressourceController.ajoutReponse);
router.patch("/ressource", auth, ressourceController.ajoutRessource);
//Routes DELETE
router.delete("/ressource/:id", auth, ressourceController.supprimerRessource);

module.exports = router;