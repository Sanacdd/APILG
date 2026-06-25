const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
      ID_Padre: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      ID_Alumno: {
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

    Direccion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  };

  const Padre = sequelize.define('Padre', attributes, {
    tableName: 'padre',
    timestamps: false,
  });

  return Padre;
};