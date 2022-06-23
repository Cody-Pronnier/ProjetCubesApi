const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const utilisateurSchema = new Schema({
  nom: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  prenom: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  pseudo: {
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
  },
  mail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Le mail n'est pas valide");
      }
    },
  },
  mot_de_passe: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("motdepasse")) {
        throw new Error('Mot de passe ne peut pas contenir "motdepasse"');
      }
    },
  },
  nbdabonne: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error(
          "Le nombre d'abonné ne peut pas être un nombre négatif"
        );
      }
    },
  },
  nbdabonnement: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error(
          "Le nombre d'abonnement ne peut pas être un nombre négatif"
        );
      }
    },
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
    type: String,
    required: false,
  },
  tokens: [{
    token: {
        type: String,
        required: true
    }
}],
  ressources: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ressource",
    },
  ],
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    default: "623b03b7b994734c2c18628f",
  },
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
