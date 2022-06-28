const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  nom: {
    type: String,
    trim: true,
  },
  trigramme: {
    type: String,
    trim: true,
    uppercase: true,
  },
  utilisateurs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Utilisateur",
    },
  ],
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
