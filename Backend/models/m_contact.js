const mongoose = require("mongoose");


const Contact = mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

module.exports = mongoose.model("Contact", Contact);