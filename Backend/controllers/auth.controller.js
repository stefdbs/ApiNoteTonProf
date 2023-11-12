/***********************************/
/*** Import des module nécessaires */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const DB = require('../db.config')
const Eleve = DB.Eleve

/**********************************/
/*** Routage de la ressource Auth */

exports.login = (req, res, next) => {
    const { email, password } = req.body

    Eleve.findOne({ where: { email: req.body.email }, raw: true })
        .then((eleve) => {
            if (!eleve) {
                return res.status(400).json({ error: "Utilisateur non trouvé " });
            }
            // bcrypt.compare(req.body.password, eleve.password)
            compare(req.body.password, eleve.password)
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

// exports.login = async (req, res) => {
//     const { email, password } = req.body

//     // Validation des données reçues
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Bad email or password' })
//     }

//     try {
//         // Vérification si l'utilisateur existe
//         let eleve = await Eleve.findOne({ where: { email: email }, raw: true })
//         if (eleve === null) {
//             return res.status(401).json({ message: 'This account does not exists !' })
//         }

//         // Vérification du mot de passe
//         //let test = await bcrypt.compare(password, user.password)
//         let test = await Eleve.checkPassword(password, eleve.password)
//         if (!test) {
//             return res.status(401).json({ message: 'Wrong password' })
//         }

//         // Génération du token et envoi
//         const token = jwt.sign({
//             id: eleve.id_eleve,
//             email: eleve.email
//         }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

//         return res.json({ access_token: token })
//     } catch (err) {
//         if (err.name == 'SequelizeDatabaseError') {
//             res.status(500).json({ message: 'Database Error', error: err })
//         }
//         res.status(500).json({ message: 'Login process failed', error: err })
//     }
// }