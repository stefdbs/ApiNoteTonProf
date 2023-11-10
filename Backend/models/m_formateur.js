const { DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

module.exports = (sequelize) => {
    const Formateur = sequelize.define('Formateur', {
        id_formateur: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING(100),
            defaultvalue: '',
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING(100),
            defaultvalue: '',
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

    })
    return Formateur
}
