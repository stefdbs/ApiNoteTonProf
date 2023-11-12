/* Import des modules necessaires */
const express = require("express");
const formateurCtrl = require("../controllers/formateur.controller");

let router = express.Router();



const GuardAuth = require("../middleware/GuardAuth");


/* Routage Formation */

router.get("/", formateurCtrl.getAllFormateurs);

router.get("/:id", formateurCtrl.getFormateur);

router.post("/", formateurCtrl.addFormateur);


module.exports = router;