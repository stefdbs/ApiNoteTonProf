/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const eleveCtrl = require("../controllers/eleve.controller");

const limiter = require("../middleware/GuardLimiter");
const GuardPasswordValidator = require("../middleware/GuardPasswordValidator");

/* Routage User */
// router.post("/signup", GuardPasswordValidator, userCtrl.signup);
// router.post("/login", limiter, userCtrl.login);

//router.post("/signup", userCtrl.signup);
router.get("/", eleveCtrl.getAllEleves);

//router.get("/:id", moduleCtrl.getModule);

router.put("/", eleveCtrl.addEleve);
router.post("/login", eleveCtrl.login);

module.exports = router



