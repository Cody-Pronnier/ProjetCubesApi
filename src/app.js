const express = require("express");
const route = express();

route.get("/test", (_req, res) =>  {
  res.status(200).send("Hello world")
})

module.exports = route;