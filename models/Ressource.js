const mongoose = require("mongoose");

const ressourceSchema = new mongoose.Schema({
  texte: {
    type: String,
    trim: true,
  },
  titre: {
    type: String,
    trim: true,
  },
  date_creation: {
    type: Date,
    required: true,
    default: Date.now,
  },
  nb_reaction: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  validation: {
    type: Boolean,
    default: true,
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true,
  },
  commentaires: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commentaire",
    },
  ],
  ressourcereaction: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RessourceReaction",
    },
  ],
});

const Ressource = mongoose.model("Ressource", ressourceSchema);
module.exports = Ressource;
