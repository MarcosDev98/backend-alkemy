const userRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_deleted, is_not_deleted } = require('../index');
const bcrypt = require('bcrypt');
const express = require('express');

userRouter.use(express.json());

// AGREGAR UN USUARIO
userRouter.post('/create', async (req, res) => {
  const { username, password, email, firstname, lastname } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await mysqlConnection.query(`INSERT INTO user (username, password, email, firstname, lastname, is_deleted) SET VALUES('${username}', '${hashedPassword}', '${email}', '${firstname}', '${lastname}', '${is_not_deleted}');`);
  res.send('user added');
});

// EDITAR USUARIO
userRouter.put('/update', async (req, res) => {
  const { id, password, email, firstname, lastname } = req.body;

  // eslint-disable-next-line quotes
  await mysqlConnection.query(`UPDATE user SET password=${password}, email=${email}, firstname=${firstname}, lastname=${lastname} WHERE id=${id};`);
  res.send('user updated');
});

// ELIMINAR USUARIO
userRouter.delete('/delete', async (req, res) => {
  const { id } = req.body;

  await mysqlConnection.query(`UPDATE user SET is_deleted=${is_deleted} WHERE id=${id};`);

  res.send('user deleted');

});

module.exports = userRouter;