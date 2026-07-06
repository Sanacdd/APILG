'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const MaestroGrado = sequelize.define('MaestroGrado', {

        ID_Maestro_Grado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        DNI_Maestro: {
            type: DataTypes.CHAR(13),
            allowNull: false,
        },

        ID_Grado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        Titular: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }

    }, {
        tableName: 'maestro_grado',
        timestamps: false,
    });

    return MaestroGrado;
};