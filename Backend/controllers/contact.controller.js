const DB = require('../db.config')
const Contact = DB.Contact



exports.addContact = async (req, res) => {
    const contactObject = JSON.parse(req.body);
    const contact = new Contact({
        nom: contactObject.nom,
        email: contactObject.email,
        message: contactObject.message,

    })
    message
        .save()
        .then(() => res.status(200).json({ message: "Message envoyé!" }))
        .catch((error) => res.status(400).json({ error: error }))
}
