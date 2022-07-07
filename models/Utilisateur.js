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
    default: true,
  },
  image: {
    type: String,
    required: false,
    default: "data:image/png;base64,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"
  },
  tokens: [{
    token: {
        type: String,
        required: true
    }
}],
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    default: "62c58a42a04b6b5dedcc491e",
  },
  ressources: [{
    type: Schema.Types.ObjectId,
    ref: "Ressource"
  }]
})


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


utilisateurSchema.pre('remove', async function (next) {
  const utilisateur = this;
  await Ressource.deleteMany({ utilisateur: utilisateur._id });
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
