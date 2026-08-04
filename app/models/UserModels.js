'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
    userId: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },

    pass: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    passwordResetRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  };

  const options = {
    defaultScope: {
      attributes: {
        exclude: ['pass'],
      },
    },

    scopes: {
      withPassword: {
        attributes: {},
      },
    },

    tableName: 'user',
    timestamps: false,
  };

  return sequelize.define('User', attributes, options);
};