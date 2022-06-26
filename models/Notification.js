const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    texte: {
        type: String,
        required: true,
      },
      image: {
        data: Buffer,
        contentType: String,
        required: true
      },
      utilisateur: {
        type: Schema.Types.ObjectId,
        ref: "Utilisateur"
      },
  });
  
const NotificationModel = mongoose.model("Notification", notificationSchema);
module.exports = NotificationModel;
