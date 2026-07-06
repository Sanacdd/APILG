'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const attributes = {

        ID_Calificacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        DNI_Alumno: {
            type: DataTypes.CHAR(13),
            allowNull: false
        },

        ID_Clase: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        Parcial1: {
            type: DataTypes.DECIMAL(5,2)
        },

        Parcial2: {
            type: DataTypes.DECIMAL(5,2)
        },

        Parcial3: {
            type: DataTypes.DECIMAL(5,2)
        },

        Parcial4: {
            type: DataTypes.DECIMAL(5,2)
        },

        Promedio: {
            type: DataTypes.DECIMAL(5,2)
        }

    };

    const Calificacion = sequelize.define('Calificacion', attributes, {
        tableName: 'calificacion',
        timestamps: false
    });

    return Calificacion;

};