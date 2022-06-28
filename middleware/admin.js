const Utilisateur = require('../models/Utilisateur');
const jwt = require('jsonwebtoken');


const admin = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'eroighaoeijgrpaojegp54546')
        const utilisateur = await Utilisateur.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!utilisateur) {
            throw new Error()
        }
      if(utilisateur.role._id == "62b8afecba94341d8b6ee377") {
        next();
      } else {
        res.status(401).send({ error: "Vous n'avez pas les droits pour accèder à cette ressource." });
      }
    } catch (e) {
        res.status(401).send({ error: "Vous n'avez pas les droits pour accèder à cette ressource." })
    }
}

module.exports = admin