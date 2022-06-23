import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RessourceSchema = new Schema({
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

module.exports =  mongoose.model("Ressource", ressourceSchema);

