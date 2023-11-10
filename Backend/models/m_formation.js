const { DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

module.exports = (sequelize) => {
    const Formation = sequelize.define('Formation', {
        id_formation: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING(100),
            defaultvalue: '',
            allowNull: false
        },
        debut: {
            type: DataTypes.INTEGER,
            defaultvalue: 0,
            allowNull: false
        },
        fin: {
            type: DataTypes.INTEGER,
            defaultvalue: 0,
            allowNull: false

        }


    })
    return Formation
}