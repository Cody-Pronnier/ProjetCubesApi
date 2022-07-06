const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ressourceSchema = new Schema({
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
    default: 0
  },
  image: {
    type: String
  },
  validation: {
    type: Boolean,
    default: true,
  },
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true
  },
  commentaires: [{
    type: Schema.Types.ObjectId,
    ref: "Utilisateur", 
    content: String
  }],
  ressourcereaction: [{
    type: Schema.Types.ObjectId,
    ref: "RessourceReaction"
  }]
});

const Ressource =  mongoose.model("Ressource", ressourceSchema);
module.exports = Ressource;
