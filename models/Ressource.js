const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ressourceSchema = new Schema({
  texte: {
    type: String,
    trim: true,
  },
  titre: {
    type: String,
    required: true,
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
    data: Buffer,
    contentType: String,
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
    ref: "Commentaire"
  }]
});

const Ressource =  mongoose.model("Ressource", ressourceSchema);
module.exports = Ressource;
