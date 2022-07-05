const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const abonnementSchema = new Schema({
    utilisateur: {
      type: Schema.Types.ObjectId,
      ref: "Utilisateur"
    },
    abonnement: {
      type: Schema.Types.ObjectId,
      ref: "Utilisateur"
    }
  });
  
const AbonnementModel = mongoose.model("Abonnement", abonnementSchema);
module.exports = AbonnementModel;
