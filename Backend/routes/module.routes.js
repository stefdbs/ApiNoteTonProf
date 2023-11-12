/* Import des modules necessaires */
const express = require("express");
const moduleCtrl = require("../controllers/module.controller");

let router = express.Router();



const GuardAuth = require("../middleware/GuardAuth");


/* Routage Module */

router.get("/", moduleCtrl.getAllModules);

router.get("/:id", moduleCtrl.getModule);

router.post("/", moduleCtrl.addModule);


module.exports = router;