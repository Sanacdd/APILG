const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  const Maestro = sequelize.define('Maestro', {

    DNI: {
      type: DataTypes.CHAR(13),
      primaryKey: true,
      allowNull: false,
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

    Cargo: {
      type: DataTypes.ENUM('Docente', 'Administrativo'),
      allowNull: false,
      defaultValue: 'Docente',
    }

  }, {
    tableName: 'maestro',
    timestamps: false,
  });

  return Maestro;
};