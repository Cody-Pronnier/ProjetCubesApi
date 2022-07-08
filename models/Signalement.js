const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signalementSchema = new Schema({
    quisignale: {
      type: Schema.Types.ObjectId,
      ref: "Utilisateur"
    },
    quiestsignale: {
      type: Schema.Types.ObjectId,
      ref: "Utilisateur"
    },
    description: {
        type: String,
        trim: true
       
      }
  });
  
const SignalementModel = mongoose.model("Signalement", signalementSchema);
module.exports = SignalementModel;