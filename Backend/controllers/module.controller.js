const DB = require('../db.config')
const Module = DB.Module
const Formateur = DB.Formateur


exports.getAllModules = (req, res) => {
    Module.findAll()
        .then(modules => res.json({ data: modules }))
        .catch(e => res.status(500).json({ message: 'Database Error', error: e }))
}

exports.getModule = async (req, res) => {
    let moduleId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!moduleId) {
        return res.status(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération
        let modules = await Module.findOne({
            where: { id_module: moduleId },
            include:
            {
                model: Formateur,
                attributes: ['id_formateur', 'nom', 'prenom']
            },
        })

        // Test si résultat
        if (modules === null) {
            return res.status(404).json({ message: 'This module does not exist !' })
        }

        // Renvoi 
        return res.json({ data: modules })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addModule = async (req, res) => {
    const { nom, id_formation, id_formateur } = req.body

    // Validation des données reçues
    if (!nom || !id_formation || !id_formateur) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification 
        let modules = await Module.findOne({ where: { nom: nom }, raw: true })

        if (modules !== null) {
            return res.status(409).json({ message: `The module ${nom} already exists !` })
        }

        // Création 
        modules = await Module.create(req.body)
        return res.json({ message: 'module Created', data: modules })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}