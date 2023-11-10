const DB = require('../db.config')
const Formateur = DB.Formateur


exports.getAllFormateurs = (req, res) => {
    Formateur.findAll()
        .then(formateurs => res.json({ data: formateurs }))
        .catch(e => res.status(500).json({ message: 'Database Error', error: e }))
}

exports.getFormateur = async (req, res) => {
    let formateurId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!formateurId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération
        let formateur = await Formateur.findOne({ where: { id: formateurId } })

        // Test si résultat
        if (formateur === null) {
            return res.status(404).json({ message: 'This formateur does not exist !' })
        }

        // Renvoi 
        return res.json({ data: formateur })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addFormateur = async (req, res) => {
    const { nom, prenom, email } = req.body

    // Validation des données reçues
    if (!nom || !prenom || !email) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification 
        let formateur = await Formateur.findOne({ where: { email: email }, raw: true })
        if (formateur !== null) {
            return res.status(409).json({ message: `The formateur ${nom} already exists !` })
        }

        // Création 
        formateur = await Formateur.create(req.body)
        return res.json({ message: 'Formateur Created', data: formateur })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}