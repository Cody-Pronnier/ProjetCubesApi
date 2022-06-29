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

  // Affiche un role [OK]

const afficherRole = async (req, res) => {
  const role = await RoleModel.find({ _id: req.params.id });
  res.send(role);
};

// Modifie un role [OK]

const modifierRole = async (req, res) => {
  const role = await RoleModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!role) {
    res.status(404).send("Ce role n'existe pas.");
  }
  await role.save();
  res.send(role);
};

// Supprime un ressource [OK]

const supprimerRole = async (req, res) => {
  const role = await RoleModel.findByIdAndDelete(req.params.id);
  if (!role) {
    res.status(404).send("Ce role n'existe pas.");
  }
  res.status(200).send();
};

  module.exports = {
    ajoutRole,
    afficherRoles,
    afficherRole,
    modifierRole,
    supprimerRole
  };
  