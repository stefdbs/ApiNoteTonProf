const DB = require('../db.config')
const Eleve = DB.Eleve
const Formation = DB.Formation
const Module = DB.Module
const Formateur = DB.Formateur
const Note = DB.Note


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
                        eleveId: eleve.id_eleve,
                        token: jwt.sign({ eleveId: eleve.id_eleve }, process.env.SECRET_KEY, {
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
        return res.status(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération
        let eleve = await Eleve.findOne({
            where: { id_eleve: eleveId },
            include: [
                {
                    model: Formation,
                    attributes: ['nom'],
                    include:
                    {
                        model: Module,
                        attributes: ['nom'],
                        include:
                        {
                            model: Formateur,
                            attributes: ['nom', 'prenom', 'id_formateur']
                        },

                    },
                },
            ]
        })

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

exports.giveNote = (req, res) => {
    const eleveId = parseInt(req.params.id)
    const formateurId = parseInt(req.body.id_formateur)// Assurez-vous que id_module est dans le corps de la requête
    const noteValue = parseInt(req.body.value)
    const noteComment = req.body.comment

    if (!eleveId || !formateurId || isNaN(noteValue) || !noteComment) {
        return res.status(400).json({ message: 'Missing Data or invalid' });
    }

    try {
        // Vérification si le formateur existe
        let formateur = Formateur.findOne({ where: { id_formateur: formateurId }, raw: true })
        if (formateur === null) {
            return res.status(409).json({ message: `The formateur ${nom} doesn't exists !` })
        }
        // Vérification si l'éleve a déjà donné une note
        const existingNote = Note.findOne({
            where: {
                id_eleve: eleveId,
                id_formateur: formateurId
            }
        });
        if (existingNote) {
            return res.status(400).json({ message: 'You have already noted this teacher' });
        }

        const note = Note.create({
            id_eleve: eleveId,
            id_formateur: formateurId,
            value: noteValue,
            comment: noteComment,
        })
        return res.json({ message: "note given" })

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