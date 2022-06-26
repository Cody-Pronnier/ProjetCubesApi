const RessourceModel = require("../models/Ressource");
const RessourceReactionModel = require("../models/RessourceReaction");

const ajoutRessource = async (req, res) => {
  const ressource = new RessourceModel({
    ...req.body,
    utilisateur: req.utilisateur._id,
  });
  try {
    await ressource.save();
    res.status(201).send(ressource);
  } catch (e) {
    res.status(400).send(e);
  }
};

// switch une ressource non valid à valid ou inversement
const switchRessource = async (req, res) => {
  const ressource = await RessourceModel.find(req.params.id, req.body);
  if (!ressource) {
    res.status(404).send("Ce ressource n'existe pas.");
  }
  try {
    if (ressource.validation === true) {
      ressource.validation = false;
    } else {
      ressource.validation = true;
    }
    await ressource.save();
    res.status(201).send(ressource);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Ajout ou Suppression d'un j'aime
const reactionRessource = async (req, res) => {
  const ressource = await RessourceModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  if (!ressource) {
    return res.status(400).send("Ce ressource n'existe pas.");
  }
  try {
    var idexistant = await RessourceReactionModel.find({
      ressource: ressource._id,
      utilisateur: req.utilisateur._id,
    });

    if (idexistant == null || idexistant == "") {
      const jaime = new RessourceReactionModel({
        ressource: ressource._id,
        utilisateur: req.utilisateur._id,
      });
      ressource.nb_reaction++;
      await ressource.save(), jaime.save();
      res.status(200).send(ressource);
    } else {
      const jenaimeplus = await RessourceReactionModel.findByIdAndDelete(
        idexistant
      );
      ressource.nb_reaction--;
      await ressource.save();
      res.status(200).send(ressource);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  ajoutRessource,
  reactionRessource,
  switchRessource
};
