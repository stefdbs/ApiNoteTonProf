/* Import des modules necessaires */
const app = require("./app");
const dotenv = require("dotenv").config({ encoding: "latin1" });
const mongoose = require("mongoose");

/*** Import de la connexion à la DB */
let DB = require('./db.config')
let MONGODB_URL = require('./db.config')

/* Connection BDD mongoose */
/********************************/
/*** Start serveur avec test DB */

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MONGODB connexion OK')
        DB.sequelize
            .authenticate()
            .then(() => console.log('MariaDB connexion OK'))
            .then(() => {
                app.listen(process.env.SERVER_PORT, () => {
                    console.log(`This server is running on port ${process.env.SERVER_PORT}. Have fun !`)
                })
            })
            .catch(err => console.log('Database Error', err))
    })
    .catch(e => console.log('Database error- mongo', e))






