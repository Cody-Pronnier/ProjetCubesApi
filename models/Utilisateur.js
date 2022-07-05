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
    default: "623b03b7b994734c2c18628f",
  },
})

utilisateurSchema.virtual("ressources", {
  ref: "Ressource",
  localField: "_id",
  foreignField: "utilisateur"
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
  delete utilisateurObject.image;

  return utilisateurObject;
};

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema)
module.exports = Utilisateur;
