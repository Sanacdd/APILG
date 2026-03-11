'use strict'

const Sequelize = require('sequelize');
require('dotenv').config();

const sequelizeInstance = new Sequelize(
    process.env.DB, 
    process.env.DB_USER, 
    process.env.PASSWORD, 
{
    host: process.env.HOST,
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

module.exports = db;