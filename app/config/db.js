'use strict'
const Sequelize = require('sequelize');
require('dotenv').config();
const sequelizeInstance = new Sequelize(
    process.env.DB, 
    process.env.DB_USER, 
    process.env.PASSWORD, 
{
    host: process.env.HOST,//
    dialect: process.env.DIALECT,
    port: process.env.MY_SQL_PORT,
    dialectOptions: {
        connectTimeout: 10000,
    },
    pool: {
        max: parseInt(process.env.POOL_MAX),
        min: parseInt(process.env.POOL_MIN),
        acquire: parseInt(process.env.POOL_ACQUIRE),
        idle: parseInt(process.env.POOL_IDLE)
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelizeInstance = sequelizeInstance;
db.alumno = require('../models/alumnoModels')(sequelizeInstance, Sequelize);
db.clase = require('../models/claseModels')(sequelizeInstance, Sequelize);
db.grado = require('../models/gradoModels')(sequelizeInstance, Sequelize);
db.gradoClase = require('../models/gradoClaseModels')(sequelizeInstance, Sequelize);
db.maestro = require('../models/maestroModels')(sequelizeInstance, Sequelize);
db.padre = require('../models/padreModels')(sequelizeInstance, Sequelize);//Aquí se importa el modelo de pagos, que se define en el archivo pagosModels.js, y se le pasa la instancia de Sequelize y el objeto Sequelize para que pueda definir su estructura y relaciones.
db.pagos = require('../models/pagosModels')(sequelizeInstance, Sequelize);//Aquí se establece la relación entre el modelo de grado y el modelo de clase, indicando que un grado pertenece a una clase a través de la clave foránea ID_Clase.

db.grado.belongsToMany(db.clase, {
    through: db.gradoClase,
    foreignKey: 'ID_Grado',
    otherKey: 'ID_Clase'
});
db.clase.belongsToMany(db.grado, {
    through: db.gradoClase,
    foreignKey: 'ID_Clase',
    otherKey: 'ID_Grado'
});

module.exports = db;