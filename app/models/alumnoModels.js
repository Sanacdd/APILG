const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
    ID_Alumno: {
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
  };

  const Alumno = sequelize.define('Alumno', attributes, {
    tableName: 'alumno',
    timestamps: false,
  });

  return Alumno;
};