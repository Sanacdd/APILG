const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  const Pagos = sequelize.define('Pagos', {

    ID_Pagos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    DNI_Padre: {
      type: DataTypes.CHAR(13),
      allowNull: true,
    },

    DNI_Alumno: {
      type: DataTypes.CHAR(13),
      allowNull: true,
    },

    Fecha_Pago: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    Mes_Correspondiente: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },

    Anio_Correspondiente: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },

    Monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    Numero_Referencia: {
      type: DataTypes.STRING(30),
      allowNull: false,
      allowNull: false,
    },
    Mes_Correspondiente: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    Anio_Correspondiente: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    Numero_Referencia: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

  }, {
    Comprobante: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  }, {
    tableName: 'pagos',
    timestamps: false,
  });

  return Pagos;

};