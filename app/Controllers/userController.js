'use strict'

const db = require('../config/db');
const user = db.user;
const {Op} = require("sequelize");
const bcrypt = require('bcrypt');
const tokenService = require('../Service/Token');


async function singUp(req, res) {
  let newPass = undefined;
  await bcrypt.genSalt(10).then(async salts => {
    await bcrypt.hash(req.body['pass'], salts)
      .then(hash => {newPass = hash})
      .catch(err =>  console.error(err));
    })
    user.create({
        userId: req.body['Id'],
        pass: newPass,
        rolId: req.body['rolId'],
        passwordResetRequired: req.body['passwordResetRequired']
    })
    .then(data => {res.status(200).send({data}) })
    .catch(err => {res.status(500).send({message: 
      err.message})});    
}   

async function singIn(req, res) {
  const userId = req.body['Id'];
  var condition = userId ?  { userId: {[Op.eq]: `${userId}` } } : null;

  user.findOne({where: condition})
  .then()
  .catch()
}

module.exports = {
    singUp,
    singIn
}