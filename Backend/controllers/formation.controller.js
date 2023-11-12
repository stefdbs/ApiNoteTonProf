const DB = require('../db.config')
const Formation = DB.Formation
const Module = DB.Module


exports.getAllFormations = (req, res) => {
    Formation.findAll()
        .then(formations => res.json({ data: formations }))
        .catch(e => res.status(500).json({ message: 'Database Error', error: e }))
}


exports.getFormation = async (req, res) => {
    let formationId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!formationId) {
        return res.status(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération
        let formation = await Formation.findOne({
            where: { id_formation: formationId },
            include:
            {
                model: Module,
                attributes: ['id_module', 'nom', 'id_formateur']
            },
        })

        // Test si résultat
        if (formation === null) {
            return res.status(404).json({ message: 'This formation does not exist !' })
        }

        // Renvoi 
        return res.json({ data: formation })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addFormation = async (req, res) => {
    const { nom, debut, fin } = req.body

    // Validation des données reçues
    if (!nom || !debut || !fin) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification 
        let formation = await Formation.findOne({ where: { nom: nom }, raw: true })
        if (formation !== null) {
            return res.status(409).json({ message: `The formation ${nom} already exists !` })
        }

        // Création 
        formation = await Formation.create(req.body)
        return res.json({ message: 'Formation Created', data: formation })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}