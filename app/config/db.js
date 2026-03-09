'use strict'

const sequelize = require ('sequelize');

const sequelizeInstance = new sequelize
(process.env.bd,
    process.env.user.process.env.password,{

 });

 const db = {};

 db.sequelize = sequelize;
 db.sequelizeInstance = sequelizeInstance