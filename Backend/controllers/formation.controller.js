const DB = require('../db.config')
const Formation = DB.Formation


exports.getAllFormations = (req, res, next) => {
    Formation.findAll()
        .then((formations) => {
            res.status(200).json(formations);
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        })
}

exports.getOneFormation = (req, res, next) => {
    // Recup sauce avec id
    Formation.findOne({ _id: req.params.id })
        // Affichage sauce
        .then((formations) => {
            res.status(200).json(formations);
        })
        .catch((error) => {
            res.status(404).json({
                error: error,
            });
        });
};

exports.createFormation = async (req, res, next) => {
    const { nom, debut, fin } = req.body

    //Validation des données
    if (!nom || !debut || !fin) {
        return res.status(400).json({ message: 'missing data' })
    }

    try {
        //verification
        let formation = Formation.findOne({ where: { nom: nom }, raw: true })
        if (formation !== null) {
            return res.status(400).json({ message: `the formation ${nom} already exists !` })
        }

        //création
        formation = await Formation.create(req.body)
        return res.json({ message: `foramtion created`, data: formation })

    } catch (err) {
        return res.status(500).json({ message: 'databasee error', error: err })
    }
}
// const formationObject = JSON.parse(req.body.formation);
// const formation = new Formation({
//     ...formationObject,
//     imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
//     likes: 0,
//     dislikes: 0,
//     usersLiked: [],
//     usersDisliked: [],
// })
// sauce
//     .save()
//     .then(() => res.status(200).json({ message: "Sauce enregistré!" }))
//     .catch((error) => res.status(400).json({ error: error }))
// }