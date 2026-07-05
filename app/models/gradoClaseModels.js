'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GradoClase = sequelize.define('GradoClase', {
    ID_Grado_Clase: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    ID_Grado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ID_Clase: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'grado_clase',
    timestamps: false,
  });

  return GradoClase;
};