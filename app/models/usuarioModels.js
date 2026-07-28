const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
    ID_Usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    Correo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    Rol: {
      type: DataTypes.ENUM('Administrador', 'Maestro', 'Padre'),
      allowNull: false,
    },

    Estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  };

  const Usuario = sequelize.define('Usuario', attributes, {
    tableName: 'usuario',
    timestamps: false,
  });

  return Usuario;
};