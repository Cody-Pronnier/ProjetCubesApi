const express = require ('express');
const router = express.Router();
const userController = require('../controllers/utilisateur.controller');

router.get("/utilisateur", userController.afficherUtilisateurs);
router.post("/utilisateur", userController.ajoutUtilisateur);

module.exports = router;