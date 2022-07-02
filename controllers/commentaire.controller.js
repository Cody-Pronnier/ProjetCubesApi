const CommentaireModel = require("../models/Commentaire");

// Créer un commentaire [OK]

const ajoutCommentaire = async (req, res) => {
    const commentaire = new CommentaireModel({...req.body, ressource: req.ressource._id});
    try {
    await commentaire.save();
    res.status(201).send(commentaire);
  } catch (e) {
    res.status(400).send(e);
  }
};
  
  // Affiche tous les commentaire [OK]
  
const afficherCommentaires = async (req, res) => {
    const commentaires = await CommentaireModel.find({});
    res.send(commentaires);
  };
  
  // Affiche un commentaire [OK]
  
const afficherCommentaire = async (req, res) => {
    const commentaire = await CommentaireModel.find({ _id: req.params.id });
    res.send(ressource);
  };
  
  // Modifie un commentaire [OK]
  
const modifierCommentaire = async (req, res) => {
    const commentaire = await CommentaireModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!commentaire) {
      res.status(404).send("Ce commentaire n'existe pas.");
    }
    await commentaire.save();
    res.send(commentaire);
  };
  
  // Supprime un commentaire [OK]
  
const supprimerCommentaire = async (req, res) => {
    const commentaire = await CommentaireModel.findByIdAndDelete(req.params.id);
    if (!ressource) {
      res.status(404).send("Ce commentaire n'existe pas.");
    }
    res.status(200).send();
  };
  
  
  // switch un commentaire non valid à valid ou inversement
  
const switchCommentaire = async (req, res) => {
    const commentaire = await CommentaireModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!commentaire) {
      res.status(404).send("Ce commentaire n'existe pas.");
    }
    if(commentaire.validation === true) {
      commentaire.validation = false;
    } else {
      commentaire.validation = true;
    }
  
    await commentaire.save();
    res.send(commentaire);
  };

  module.exports = {
    ajoutCommentaire,
    afficherCommentaires,
    afficherCommentaire,
    modifierCommentaire,
    supprimerCommentaire,
    switchCommentaire
  };
  