const express = require ('express');
const router = express.Router();
const ressourceController = require('../controllers/role.controller');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post("/role", auth, ressourceController.ajoutRole);
router.get("/role", auth, ressourceController.afficherRoles);

module.exports = router;