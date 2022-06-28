const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ressourceRoute = require('./routes/ressource.routes');
const utilisateurRoute = require('./routes/utilisateur.routes');
const roleRoute = require('./routes/role.routes');

// Séléction du port de lancement du serveur.
const port = process.env.PORT || 3000;

//Lancement CORS = Partage des Ressources entre Origines Multiples. Ca permet au navigateur de vérifier que la réponse du serveur autorise ce domaine à consulter la ressource
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// On met en place les paramètres du serveur Node
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

//Connexion à la BDD Mongo
mongoose.connect(
    "mongodb+srv://utilisateur:utilisateur15342679@cluster0.uwisi.mongodb.net/?retryWrites=true&w=majority"
  );
  
// On instancie les routes
app.use('/api', ressourceRoute);
app.use('/api', utilisateurRoute);
app.use('/api', roleRoute);

//Vérification dans la console si tout se lance correctement
app.listen(port, () => {
  console.log(`Le serveur a bien été lancé sur le port: ${port}`);
});