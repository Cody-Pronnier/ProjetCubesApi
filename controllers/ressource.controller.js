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
      const jaime = new RessourceReactionModel({ ressource: ressource._id, utilisateur: req.utilisateur._id});
      ressource.nb_reaction ++;
      await ressource.save(), jaime.save();
      res.status(200).send(ressource);
    } else {
      const jenaimeplus = await RessourceReactionModel.findByIdAndDelete(idexistant);
      ressource.nb_reaction --;
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
};
