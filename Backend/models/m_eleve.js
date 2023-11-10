const { DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

module.exports = (sequelize) => {
    const Eleve = sequelize.define('Eleve', {
        id_eleve: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        id_formation: {
            type: DataTypes.INTEGER(10),
            allowNull: false
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
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i
        }


    })
    return Eleve
}
