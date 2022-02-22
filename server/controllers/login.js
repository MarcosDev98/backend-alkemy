const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_not_deleted } = require('../utils/globals.js');
const bcrypt = require('bcrypt');
const express = require('express');
require('dotenv').config();

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


  if (!(user[0] && correctPassword)) {
    return response.status(401).json({
      error: 'usuario o contraseña incorrectos'
    });

    //no me gusta este return pero no supe como hacer que termine con el response de arriba.
    // Porque si no pongo el return, sigue ejecutando y revienta en user[0].id porque no hay nada en user[0].
    //return
  } 

  const userForToken = {
    id: user[0].id,
    username: user[0].username
  };

  const token = jwt.sign(userForToken, 'alkemy');

  response.send({
    id: user[0].id,
    name: user[0].firstname,
    username: user[0].username,
    token
  });

});

module.exports = loginRouter;