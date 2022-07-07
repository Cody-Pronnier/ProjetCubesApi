const express = require ('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

//Routes GET
router.get("/role", auth, roleController.afficherRoles);
router.get("/api/role/:id", auth, roleController.afficherRole);
//Routes POST
router.post("/role", auth, roleController.ajoutRole);
//Routes PATCH
router.patch("/api/role/:id", auth, roleController.modifierRole);
//Routes DELETE
router.delete("/api/role/:id", auth, roleController.supprimerRole);

module.exports = router;