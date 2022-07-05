const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentaireSchema = new Schema({
  description: {
    type: String,
    trim: true,
  },
  date_creation: {
    type: Date,
    required: true,
    default: Date.now,
  },
  validation: {
    type: Boolean,
    default: false,
  },
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true,
  },
  ressource: {
    type: Schema.Types.ObjectId,
    ref: "Ressource",
    required: true,
  },
  commentaire2: [
    {
      type: Schema.Types.ObjectId,
      ref: "Commentaire2"
    },
  ],
});

const CommentaireModel = mongoose.model("Commentaire", commentaireSchema);
module.exports = CommentaireModel;
