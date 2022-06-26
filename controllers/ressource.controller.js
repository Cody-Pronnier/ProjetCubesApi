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
  console.log(req.utilisateur);

  if (!ressource) {
    res.status(404).send("Ce ressource n'existe pas.");
  } else {
    var idexistant = await RessourceReactionModel.find({
      ressource: ressource._id,
      utilisateur: "62a9dc084dc6033c7098a69a",
    });
    if (idexistant == null || idexistant == "") {
      const jaime = new RessourceReactionModel({
        _id: new mongoose.Types.ObjectId(),
        ressource: ressource._id,
        utilisateur: "62a9dc084dc6033c7098a69a",
      });
      await jaime.save();
      ressource.nb_reaction++;
      await ressource.save();
      res.send(jaime, ressource);
    } else {
      const jenaimeplus = await RessourceReactionModel.findByIdAndDelete(
        idexistant
      );

      ressource.nb_reaction--;
      await ressource.save();
      res.status(200).send(jenaimeplus, ressource);
    }
  }
};

module.exports = {
  ajoutRessource,
  reactionRessource,
};
