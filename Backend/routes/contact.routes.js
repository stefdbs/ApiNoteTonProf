/* Import des modules necessaires */
const express = require("express");
const contactCtrl = require("../controllers/contact.controller");

let router = express.Router();



/* Routage Contact */

router.post("/", contactCtrl.addContact);


module.exports = router;