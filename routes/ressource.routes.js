const express = require ('express');
const router = express.Router();
const ressourceController = require('../controllers/ressource.controller');
const auth = require('../middleware/auth');

router.post("/ressource", auth, ressourceController.ajoutRessource);
router.patch("/ressource/:id/reaction", auth, ressourceController.reactionRessource);

module.exports = router;