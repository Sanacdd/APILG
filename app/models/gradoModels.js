'use strict'
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  const Grado = sequelize.define('Grado', {

    ID_Grado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

   
    Nombre_Grado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    Seccion: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },

    Anio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

  }, {
    tableName: 'grado',
    timestamps: false,
  });

  return Grado;
};