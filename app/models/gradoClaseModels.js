'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GradoClase = sequelize.define('GradoClase', {
    ID_Grado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },

    ID_Clase: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  }, {
    tableName: 'grado_clase',
    timestamps: false,
  });

  return GradoClase;
};