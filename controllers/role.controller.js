const RoleModel = require("../models/Role");


  // Ajouter un role [OK]
const ajoutRole = async (req, res) => {
    console.log(req.body);
    const role = new RoleModel({...req.body});
    await role.save();
    res.send(role);
  };
  
  // Affiche tous les roles [OK]
  
const afficherRoles = async (req, res) => {
    const roles = await RoleModel.find({});
    res.send(roles);
  };

  module.exports = {
    ajoutRole,
    afficherRoles
  };
  