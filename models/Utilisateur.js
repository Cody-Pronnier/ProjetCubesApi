const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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
    required: false
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

utilisateurSchema.pre('save', async function (next) {
  const utilisateur = this;

  if (utilisateur.isModified('mot_de_passe')) {
    utilisateur.mot_de_passe = await bcrypt.hash(utilisateur.mot_de_passe, 8);
  }

  next();
});


utilisateurSchema.methods.generateAuthToken = async function () {
  const utilisateur = this;

  const token = jwt.sign({ _id: utilisateur._id.toString() }, 'eroighaoeijgrpaojegp54546');
  utilisateur.tokens = utilisateur.tokens.concat({ token });
  await utilisateur.save();
  return token;
};



utilisateurSchema.statics.findByCredentials = async (mail, mot_de_passe) => {
  const utilisateur = await Utilisateur.findOne({ mail });
  if (!utilisateur) {
      throw new Error('Mauvais identifiants');
  }
  const compareOk= await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
  if (!compareOk) {
      throw new Error('Mauvais identifiants');
  }

  return utilisateur;
};


utilisateurSchema.pre('delete', async function (next) {
  const utilisateur = this;
  await Ressource.deleteMany({ owner: user._id });
  next();
});

utilisateurSchema.methods.toJSON = function () {
  const utilisateur = this;
  const utilisateurObject = utilisateur.toObject();

  delete utilisateurObject.mot_de_passe;
  delete utilisateurObject.tokens;

  return utilisateurObject;
};

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema)
module.exports = Utilisateur;
