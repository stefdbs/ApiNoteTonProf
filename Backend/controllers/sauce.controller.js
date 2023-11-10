const Sauce = require("../models/sauce.model");
const fs = require("fs");
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces);
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        })
}

exports.getOneSauce = (req, res, next) => {
    // Recup sauce avec id
    Sauce.findOne({ _id: req.params.id })
        // Affichage sauce
        .then((sauce) => {
            res.status(200).json(sauce);
        })
        .catch((error) => {
            res.status(404).json({
                error: error,
            });
        });
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    })
    sauce
        .save()
        .then(() => res.status(200).json({ message: "Sauce enregistré!" }))
        .catch((error) => res.status(400).json({ error: error }))
}

exports.deleteSauce = (req, res, next) => {
    // Recup sauce avec id
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {

            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ message: "Vous n'êtes pas l'utilisateur qui à créé la sauce" });
            } else {
                const filename = sauce.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    // Suppression sauce
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
                        .catch((error) => res.status(400).json({ error }));
                });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};


exports.modifySauce = (req, res, next) => {

    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    } : { ...req.body }

    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(404).json({ message: "Vous n'êtes pas le créateur de la sauce!" })
            } else {
                if (req.file) {
                    const filename = sauce.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject })
                            .then(() => res.status(200).json({ message: 'Sauce modifiée!!' }))
                            .catch((error) => res.status(400).json({ message: error }))
                    })
                } else {
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée!!' }))
                        .catch((error) => res.status(400).json({ message: error }))
                }
            }
        })
        .catch((error) => res.status(500).json({ error }));

};

exports.likeDislikeSauce = (req, res, next) => {

    console.log(req.body)

    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'Sauce Liked!!' }))
                    .catch((error) => res.status(400).json({ message: error }))
            }
            if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'Sauce UnLiked!!' }))
                    .catch((error) => res.status(400).json({ message: error }))
            }
            if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'Sauce DisLiked!!' }))
                    .catch((error) => res.status(400).json({ message: error }))
            }
            if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'Sauce DisLiked!!' }))
                    .catch((error) => res.status(400).json({ message: error }))
            }
        })
        .catch((error) => res.status(500).json({ error }));
}