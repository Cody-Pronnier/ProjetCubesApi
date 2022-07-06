const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reponseSchema = new Schema({
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
  commentaire: {
    type: Schema.Types.ObjectId,
    ref: "Commentaire",
    required: true,
  }
});

const ReponseModel = mongoose.model("Reponse", reponseSchema);
module.exports = ReponseModel;
