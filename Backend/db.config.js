/************************************/
/*** Import des modules nécessaires */
const { Sequelize } = require('sequelize')

/************************************/
/*** Connexion à la base de données */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
}
)

/*** Mise en place des relations */

const db = {}

db.sequelize = sequelize
db.Formation = require('./models/m_formation')(sequelize)
db.Eleve = require('./models/m_eleve')(sequelize)
db.Formateur = require('./models/m_formateur')(sequelize)
db.Module = require('./models/m_module')(sequelize)
db.Note = require('./models/m_note')(sequelize)
db.Admin = require('./models/m_admin')(sequelize)

db.Formation.hasMany(db.Eleve, { foreignKey: 'id_formation' })
db.Eleve.belongsTo(db.Formation, { foreignKey: 'id_formation' })

db.Formation.hasMany(db.Module, { foreignKey: 'id_formation' })
db.Module.belongsTo(db.Formation, { foreignKey: 'id_formation' })

db.Formateur.hasMany(db.Module, { foreignKey: 'id_formateur', onDelete: 'cascade' });
db.Module.belongsTo(db.Formateur, { foreignKey: 'id_formateur' });

db.Note.belongsTo(db.Eleve, { foreignKey: 'id_eleve' });

db.Note.belongsTo(db.Formateur, { foreignKey: 'id_formateur' });
/*********************************/
/*** Synchronisation des modèles */

// Commenter cette ligne à la fin du travail pour éviter des synchro
db.sequelize.sync({ alter: true })

module.exports = db