const route =  require( "./app.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(route);

app.listen(port, () => {
    console.log(`Le serveur a bien été lancé sur le port: ${port}`);
  });
  