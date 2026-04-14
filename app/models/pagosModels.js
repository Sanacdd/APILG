const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
     
    //D_Pagos es la clave primaria de la tabla y se incrementa automáticamente
    ID_Pagos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
//ID_Padre es una relacion con la tabla es una clave foranea que hace referencia a la tabla padres
      ID_Padre: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
// ID_Alumno permite relacionar el pago con alumno  y es una clave foranea que hace referencia a la tabla alumnos
      ID_Alumno: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
//almacena la fecha es campo obligatorio
    Fecha_Pago: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
//Monto es un campo obligatorio que almacena el monto del pago
    Monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
//Metodo_Pago  almacena el metodo de pago utilizado
    Metodo_Pago: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
//Estado almacena el estado del pago Completado o Pendiente
    Estado: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  };
//Aquí se define el modelo Pagos, indicando que corresponde a la tabla pagos
  const Pagos = sequelize.define('Pagos', attributes, {
    tableName: 'pagos',
    timestamps: false,
  });

  return Pagos;
};