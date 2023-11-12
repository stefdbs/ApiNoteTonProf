/* Import des modules necessaires */
const express = require("express");
const formationCtrl = require("../controllers/formation.controller");

let router = express.Router();



const GuardAuth = require("../middleware/GuardAuth");

/*Middleware time*/
router.use((req, res, next) => {
    const event = new Date()
    console.log(`Formation time: `, event.toString())
    next()
})
/* Routage Formation */

router.get("/", formationCtrl.getAllFormations);

router.get("/:id", formationCtrl.getFormation);

router.post("/", formationCtrl.addFormation);


module.exports = router;