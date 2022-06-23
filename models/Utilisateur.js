const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utilisateurSchema = new Schema({
  nom: {
    type: String,
    trim: true,
    required: true
  },
  prenom: {
    type: String,
    trim: true,
    required: true,
  },
  pseudo: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  mail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  mot_de_passe: {
    type: String,
    required: true,
  },
  nbdabonne: {
    type: Number,
    default: 0
  },
  nbdabonnement: {
    type: Number,
    default: 0
  },
  date_creation: {
    type: Date,
    required: true,
    default: Date.now,
  },
  compte_actif: {
    type: Boolean,
    default: false,
  },
  image: {
    type : String,             
    required: false
  },
  ressources: [{
    type: Schema.Types.ObjectId,
    ref: "Ressource"
  }],
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    default: "623b03b7b994734c2c18628f"
  },
});


module.exports =  mongoose.model("Utilisateur", utilisateurSchema);
