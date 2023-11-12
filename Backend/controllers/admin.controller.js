const DB = require('../db.config')
const Admin = DB.Admin


const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config({ encoding: "latin1" });
const jwt = require("jsonwebtoken");


exports.login = (req, res, next) => {
    Admin.findOne({ email: req.body.email })
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
                        token: jwt.sign({ adminId: admin.id_admin }, process.env.SECRET_KEY, {
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