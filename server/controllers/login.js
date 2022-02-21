const loginRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_not_deleted } = require('../utils/globals.js');
const bcrypt = require('bcrypt');
const express = require('express');

loginRouter.use(express.json());


loginRouter.post('/', async (require, response) => {
  
  const { username, password } = require.body;
  
  
  // eslint-disable-next-line quotes
  const user = await mysqlConnection.query(`
    SELECT 
    id, 
    username, 
    password, 
    email, 
    firstname, 
    lastname, 
    is_deleted 
      FROM user 
        WHERE 
          username='${username}' 
          AND is_deleted='${is_not_deleted}'
          ;`);

  const correctPassword = user[0] === undefined
    ? false
    : await bcrypt.compare(password, user[0].password);


  if (!correctPassword) {
    response.status(401).json({
      error: 'usuario o contraseña incorrectos'
    });
  } else {
    response.send({
      id: user[0].id,
      name: user[0].firstname,
      username: user[0].username
    });
  }

  

});



module.exports = loginRouter;