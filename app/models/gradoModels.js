'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
    ID_Grado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    ID_Clase: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
  };

  const Grado = sequelize.define('Grado', attributes, {
    tableName: 'grado',
    timestamps: false,
  });

  return Grado;
};