'use strict'
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
    ID_Clase: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    Nombre_Clase: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  };

  const Clase = sequelize.define('Clase', attributes, {
    tableName: 'clase',
    timestamps: false,
  });

  return Clase;
};