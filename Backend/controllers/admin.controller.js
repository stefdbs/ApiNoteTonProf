const DB = require('../db.config')
const Admin = DB.Admin


const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config({ encoding: "latin1" });
const jwt = require("jsonwebtoken");


exports.login = (req, res, next) => {
    Admin.findOne({ where: { email: req.body.email } })
        .then((admin) => {
            if (!admin) {
                return res.status(400).json({ error: "Utilisateur non trouvé " });
            }

            bcrypt.compare(req.body.password, admin.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(400).json({ error: "Mot de passe incorrect!" })
                    }

                    res.status(200).json({
                        adminId: admin.id_admin,
                        token: jwt.sign({ where: { adminId: admin.id_admin } }, process.env.SECRET_KEY, {
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

exports.addAdmin = async (req, res) => {
    const { email, password } = req.body

    // Validation des données reçues
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification 
        let admin = await Admin.findOne({ where: { email: email }, raw: true })
        if (admin !== null) {
            return res.status(409).json({ message: `The admin ${email} already exists !` })
        }
        // Hashage du mot de passe utilisateur
        let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        req.body.password = hash

        // Création 
        admin = await Admin.create(req.body)
        return res.json({ message: 'admin Created', data: admin })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}