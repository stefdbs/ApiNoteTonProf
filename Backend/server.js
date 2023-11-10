/* Import des modules necessaires */
const express = require("express");
const dotenv = require("dotenv").config({ encoding: "latin1" });
const cors = require('cors')
const mongoose = require("mongoose");

/*** Import de la connexion à la DB */
let DB = require('./db.config')
let MONGODB_URL = require('./db.config')

/*****************************/
/*** Initialisation de l'API */
const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

/* Mise en place reponses headers */
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     next();
// });

/* Securite en tete */
// const helmet = require("helmet");

// app.use(helmet({
//     crossOriginResourcePolicy: false,
// }));

// /* RateLimit */
// const rateLimit = require("express-rate-limit");

// app.use(
//     rateLimit({
//         windowMs: 10 * 60 * 1000,
//         max: 100,
//         message:
//             "Vous avez effectué plus de 100 requêtes dans une limite de 10 minutes!",
//         headers: true,
//     })
// );


// ROUTERS 
const FormationRoutes = require("./routes/formation.routes");
const ModuleRoutes = require("./routes/module.routes");
const FormateurRoutes = require("./routes/formateur.routes")


//routage principal
app.get('/', (req, res, next) => res.send('you are online good job'))


app.use("/formations", FormationRoutes)
app.use("/modules", ModuleRoutes)
app.use("/formateurs", FormateurRoutes)




app.all('*', (req, res) => res.status(501).send('you are lost poor baby'))
/***********************************/

//routage


//const UserRoutes = require("./routes/user.routes");

// app.use("/api/auth", UserRoutes);
//app.use("/api/sauces", SauceRoutes);




/* démarrage de l'API et Connection BDD mongoose */
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






