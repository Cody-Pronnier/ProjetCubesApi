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
      if(utilisateur.role._id == "62c58a5ba04b6b5dedcc4924") {
        next();
      } else {
        res.status(401).send({ error: "Vous n'avez pas les droits pour accèder à cette ressource." });
      }
    } catch (e) {
        res.status(401).send({ error: "Vous n'avez pas les droits pour accèder à cette ressource." })
    }
}

module.exports = admin