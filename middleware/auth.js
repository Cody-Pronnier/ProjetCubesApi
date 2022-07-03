const jwt = require('jsonwebtoken')
const Utilisateur = require('../models/Utilisateur')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'eroighaoeijgrpaojegp54546')
        const utilisateur = await Utilisateur.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!utilisateur) {
            throw new Error()
        }
        req.token = token
        req.utilisateur = utilisateur
        next()
    } catch (e) {
        res.status(401).send({ error: 'Merci de vous authentifier.' })
    }
}

module.exports = auth