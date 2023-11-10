const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {
    const Note = sequelize.define('Note', {
        id_formateur: {
            type: DataTypes.INTEGER(10),
            defaultvalue: '',
        },
        id_eleve: {
            type: DataTypes.INTEGER(10),
            defaultvalue: '',
        },
        id_Module: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER(2),
            defaultvalue: 0,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING(250),
            defaultvalue: '',
            allowNull: false
        }


    })
    return Note
}