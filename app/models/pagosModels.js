const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
      ID_Pagos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      ID_Padre: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      ID_Alumno: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

    Fecha_Pago: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    Monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    Metodo_Pago: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    Estado: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  };

  const Pagos = sequelize.define('Pagos', attributes, {
    tableName: 'pagos',
    timestamps: false,
  });

  return Pagos;
};