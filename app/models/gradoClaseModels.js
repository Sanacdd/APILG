'use strict'
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const attributes = {
    ID_Grado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    ID_Clase: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  };
  const GradoClase = sequelize.define('GradoClase', attributes, {
    tableName: 'grado_clase',
    timestamps: false,
  });
  return GradoClase;
};