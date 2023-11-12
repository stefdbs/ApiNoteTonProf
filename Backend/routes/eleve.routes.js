/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const eleveCtrl = require("../controllers/eleve.controller");

const limiter = require("../middleware/GuardLimiter");
const GuardPasswordValidator = require("../middleware/GuardPasswordValidator");

/* Routage Eleve */

router.post("/", limiter, eleveCtrl.login);

router.get("/", eleveCtrl.getAllEleves);

router.get("/:id", eleveCtrl.getEleve);
router.post("/:id", eleveCtrl.giveNote)

router.put("/", eleveCtrl.addEleve);

module.exports = router



