const DB = require('../db.config')
const Eleve = DB.Eleve


const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config({ encoding: "latin1" });
const jwt = require("jsonwebtoken");


exports.login = (req, res, next) => {
    Eleve.findOne({ email: req.body.email })
        .then((eleve) => {
            if (!eleve) {
                return res.status(400).json({ error: "Utilisateur non trouvé " });
            }

            bcrypt.compare(req.body.password, eleve.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(400).json({ error: "Mot de passe incorrect!" })
                    }

                    res.status(200).json({
                        eleveId: eleve._id,
                        token: jwt.sign({ eleveId: eleve._id }, process.env.SECRET_KEY, {
                            expiresIn: "1h"
                        })
                    })

                })
                .catch((error) => res.status(500).json({ error }));

        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.getAllEleves = (req, res) => {
    Eleve.findAll()
        .then(eleves => res.json({ data: eleves }))
        .catch(e => res.status(500).json({ message: 'Database Error', error: e }))
}

exports.getEleve = async (req, res) => {
    let eleveId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!eleveId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération
        let eleve = await Eleve.findOne({ where: { id: eleveId } })

        // Test si résultat
        if (eleve === null) {
            return res.status(404).json({ message: 'This student does not exist !' })
        }

        // Renvoi 
        return res.json({ data: eleve })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}


exports.addEleve = async (req, res) => {
    const { nom, prenom, email, password, id_formation } = req.body

    // Validation des données reçues
    if (!nom || !prenom || !email || !password || !id_formation) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification 
        let eleve = await Eleve.findOne({ where: { email: email }, raw: true })
        if (eleve !== null) {
            return res.status(409).json({ message: `The student ${nom} already exists !` })
        }

        // Création 
        eleve = await Eleve.create(req.body)
        return res.json({ message: 'Student Created', data: eleve })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}