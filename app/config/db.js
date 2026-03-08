'use strict'

const Sequelize = require('sequelize');
require('dotenv').config();

const sequelizeInstance = new Sequelize(
    process.env.db, 
    process.env.USER, 
    process.env.PASSWORD,
{
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port: process.env.MYSQL_PORT,
    dialectOptions: {
        connectTimeout: 10000,
    },
    operatorsAliases: false,
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

// Modelo de Alumno
db.alumno = require('../models/alumnoModels')(sequelizeInstance, Sequelize);

module.exports = db;