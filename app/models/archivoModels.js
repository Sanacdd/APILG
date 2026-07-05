'use strict'

module.exports = (sequelize, Sequelize) => {
    const Archivo = sequelize.define('archivo', {
        ID_Archivo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre_Archivo: {
            type: Sequelize.STRING
        },
        Tipo_Archivo: {
            type: Sequelize.STRING
        },
        Fecha_Subida: {
            type: Sequelize.DATEONLY
        }
    }, {
        tableName: 'archivo',
        timestamps: false
    });

    return Archivo;
}