/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/admin.controller");

const limiter = require("../middleware/GuardLimiter");
const GuardPasswordValidator = require("../middleware/GuardPasswordValidator");

/* Routage Admin */

router.post("/", adminCtrl.addAdmin);

// router.post("/signup", GuardPasswordValidator, userCtrl.signup);


//router.post("/login", limiter, adminCtrl.login);

//router.get("/", eleveCtrl.getAllEleve);

//router.put("/", eleveCtrl.addEleve);


module.exports = router



