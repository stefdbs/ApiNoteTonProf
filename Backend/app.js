/************************************/
/*** Import des modules nécessaires */
const express = require("express");
const path = require("path");

/*****************************/
/*** Initialisation de l'API */
const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(express.json());

/* Mise en place reponses headers */
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

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

//routage principal
app.get('/', (req, res, next) => res.send('im online good job'))

//app.use("/formations", FormationRoutes)


app.all('*', (req, res) => res.status(501).send('you are lost poor baby'))
/***********************************/

//routage


//const UserRoutes = require("./routes/user.routes");

// app.use("/api/auth", UserRoutes);
//app.use("/api/sauces", SauceRoutes);

module.exports = app;