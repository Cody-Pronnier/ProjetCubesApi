const RessourceModel = require("../models/Ressource");
const RessourceReactionModel = require("../models/RessourceReaction");
const CommentaireModel = require("../models/Commentaire");




// Ajouter une ressource [OK]
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

// Affiche tous les ressources [OK]
const afficherRessources = async (req, res) => {
  const ressources = await RessourceModel.find({})
    .populate('utilisateur');
  res.send(ressources);
};

// switch une ressource non valid à valid ou inversement [OK]
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

// Ajout ou Suppression d'un j'aime [OK]
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

// Requete pour une publication en particulier [OK]
const afficherRessource = async (req, res) => {
  const ressource = await RessourceModel.find({ _id: req.params.id });
  res.send(ressource);
};

// Supprime une ressoure [OK]

const supprimerRessource = async (req, res) => {
  const ressource = await RessourceModel.findByIdAndDelete(req.params.id);
  if (!ressource) {
    res.status(404).send("Cette ressource n'existe pas.");
  }
  res.status(200).send();
};

// Modifier une ressoure [OK]
const modifierRessource = async (req, res) => {
  const ressource = await RessourceModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!ressource) {
    res.status(404).send("Cette ressource n'existe pas.");
  }
  await ressource.save();
  res.send(ressource);
};


// Afficher une ressource avec son utilisateur [OK]
const ressourcesUtilisateur = async (req, res) => {
  const ressource = await RessourceModel.find({ _id: req.params.id })
    .populate('utilisateur');
  if (!ressource) {
    res.status(404).send("");
  }
  res.send(ressource);
};

// Ajout d'un commentaire à une ressource [OK]
const ajoutCommentaire = async (req, res) => {
  const commentaire = new CommentaireModel({ ...req.body, ressource: req.params.id, utilisateur: req.utilisateur._id });
  try {
    const ressource = await RessourceModel.findById(req.params.id)
    ressource.commentaires = commentaire._id
    await ressource.save();
    await commentaire.save();
    res.status(201).send(ressource);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  ajoutRessource,
  reactionRessource,
  switchRessource,
  afficherRessources,
  afficherRessource,
  supprimerRessource,
  modifierRessource,
  ressourcesUtilisateur,
  ajoutCommentaire
};
