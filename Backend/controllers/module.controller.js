const DB = require('../db.config')
const Module = DB.Module


exports.getAllModules = (req, res) => {
    Module.findAll()
        .then(formations => res.json({ data: modules }))
        .catch(e => res.status(500).json({ message: 'Database Error', error: e }))
}

exports.getModule = async (req, res) => {
    let moduleId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!moduleId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération
        let module = await Module.findOne({ where: { id: moduleId } })

        // Test si résultat
        if (module === null) {
            return res.status(404).json({ message: 'This module does not exist !' })
        }

        // Renvoi 
        return res.json({ data: module })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addModule = async (req, res) => {
    const { nom } = req.body

    // Validation des données reçues
    if (!nom) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification 
        let module = await Module.findOne({ where: { nom: nom }, raw: true })
        if (module !== null) {
            return res.status(409).json({ message: `The module ${nom} already exists !` })
        }

        // Création 
        module = await Module.create(req.body)
        return res.json({ message: 'module Created', data: module })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}