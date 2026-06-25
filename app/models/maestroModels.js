const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
      ID_Maestro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      ID_Grado: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    Apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    Telefono: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },

    Correo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  };

  const Maestro = sequelize.define('Maestro', attributes, {
    tableName: 'maestro',
    timestamps: false,
  });

  return Maestro;
};