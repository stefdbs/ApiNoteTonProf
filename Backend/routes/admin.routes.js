/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/admin.controller");

const limiter = require("../middleware/GuardLimiter");
const GuardPasswordValidator = require("../middleware/GuardPasswordValidator");
const checkTokenMiddleware = require('../middleware/GuardAuth')

/* Routage Admin Login */
router.post("/", limiter, adminCtrl.login);

/* Routage Admin sous condition de loggin */

router.post("/addAdmin", checkTokenMiddleware, GuardPasswordValidator, adminCtrl.addAdmin);


module.exports = router



