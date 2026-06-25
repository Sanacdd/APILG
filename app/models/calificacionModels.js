'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const attributes = {

        ID_Calificacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        ID_Alumno: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        ID_Clase: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        Parcial1: {
            type: DataTypes.FLOAT
        },

        Parcial2: {
            type: DataTypes.FLOAT
        },

        Parcial3: {
            type: DataTypes.FLOAT
        },

        Parcial4: {
            type: DataTypes.FLOAT
        },

        Promedio: {
            type: DataTypes.FLOAT
        }

    };

    const Calificacion = sequelize.define('Calificacion', attributes, {
        tableName: 'calificacion',
        timestamps: false
    });

    return Calificacion;

};