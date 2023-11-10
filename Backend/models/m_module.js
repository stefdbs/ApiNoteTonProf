const { DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

module.exports = (sequelize) => {
    const Module = sequelize.define('Module', {
        id_Module: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING(100),
            defaultvalue: '',
            allowNull: false
        },
        id_formation: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        id_formateur: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },

    })
    return Module
}
