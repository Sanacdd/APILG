const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  const Alumno = sequelize.define('Alumno', {

    DNI: {
      type: DataTypes.CHAR(13),
      primaryKey: true,
      allowNull: false,
    },

    ID_Grado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    DNI_Padre: {
      type: DataTypes.CHAR(13),
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

    Fecha_Nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    Direccion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    Genero: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },

  }, {
    tableName: 'alumno',
    timestamps: false,
  });

  return Alumno;
};