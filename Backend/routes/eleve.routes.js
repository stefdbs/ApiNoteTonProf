/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const eleveCtrl = require("../controllers/eleve.controller");

const limiter = require("../middleware/GuardLimiter");
const GuardPasswordValidator = require("../middleware/GuardPasswordValidator");

/* Routage Eleve via loggin Eleve */

router.post("/login", limiter, eleveCtrl.login);
router.get("/:id", eleveCtrl.getEleve);
router.post("/:id_eleve/:id_formateur", eleveCtrl.giveNote)

/* Routage Eleve via loggin Admin */

router.get("/", eleveCtrl.getAllEleves);
router.post("/", eleveCtrl.addEleve);

module.exports = router



