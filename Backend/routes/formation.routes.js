/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const formationCtrl = require("../controllers/formation.controller");

const GuardAuth = require("../middleware/GuardAuth");

/*Middleware time*/
router.use((req, res, next) => {
    const event = new Date()
    console.log(`Formation time: `, event.toString())
    next()
})
/* Routage Formation */

//router.get("/", formationCtrl.getAllFormations);

// router.get("/:id", formationCtrl.getOneFormation);

// router.post("/", formationCtrl.createFormation);


module.exports = router;