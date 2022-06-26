const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ressourceReactionSchema = new Schema({
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur"
  },
  ressource: [{
    type: Schema.Types.ObjectId,
    ref: "Ressource"
  }]
});

const RessourceReactionModel = mongoose.model("RessourceReaction", ressourceReactionSchema);
module.exports = RessourceReactionModel;