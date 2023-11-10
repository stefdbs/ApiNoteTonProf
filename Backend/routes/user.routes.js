/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user.controller");

const limiter = require("../middleware/GuardLimiter");
const GuardPasswordValidator = require("../middleware/GuardPasswordValidator");

/* Routage User */
// router.post("/signup", GuardPasswordValidator, userCtrl.signup);
// router.post("/login", limiter, userCtrl.login);

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router



