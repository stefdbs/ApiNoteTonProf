/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const eleveCtrl = require("../controllers/eleve.controller");

const limiter = require("../middleware/GuardLimiter");
const GuardPasswordValidator = require("../middleware/GuardPasswordValidator");
const checkTokenMiddleware = require('../middleware/GuardAuth')

/* Routage Eleve via loggin Eleve */

router.post("/login", limiter, eleveCtrl.login);
router.get("/:id", checkTokenMiddleware, eleveCtrl.getEleve);
router.post("/:id_eleve/:id_formateur", checkTokenMiddleware, eleveCtrl.giveNote)

/* Routage Eleve via loggin Admin */

router.get("/", checkTokenMiddleware, eleveCtrl.getAllEleves);
router.post("/", checkTokenMiddleware, GuardPasswordValidator, eleveCtrl.addEleve);

module.exports = router



