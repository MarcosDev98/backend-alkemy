const userRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_deleted, is_not_deleted } = require('../utils/globals.js');
const bcrypt = require('bcrypt');
const express = require('express');

userRouter.use(express.json());

// AGREGAR UN USUARIO
userRouter.post('/create', async (req, res) => {
  const { username, password, email, firstname, lastname } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let isUsed = false;

  await mysqlConnection.query(`SELECT * FROM user WHERE username='${username}';`, (err,results) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    }
    if (results.affectedRows > 0) {
      isUsed = true;
    }

  });


  if (!isUsed) {
    console.log('y aca??');
    await mysqlConnection.query(`INSERT INTO user (username, password, email, firstname, lastname, is_deleted) VALUES('${username}', '${hashedPassword}', '${email}', '${firstname}', '${lastname}', '${is_not_deleted}');`, (err) => {
      if (err) {
        const error = { code: err.code, message: err.message };
        throw error;
      } else {
        res.json({ status: 'OK' });
      }
    });
  } else {
    console.log('entra o no entra?');
    res.json({ code: 'USERNAME_USED', message: 'username is already used' });
  }
});

// EDITAR USUARIO
userRouter.put('/update', async (req, res) => {
  const { id, password, email, firstname, lastname } = req.body;

  // eslint-disable-next-line quotes
  await mysqlConnection.query(`UPDATE user SET password=${password}, email=${email}, firstname=${firstname}, lastname=${lastname} WHERE id=${id};`, (err) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      res.json({ status: 'OK' });
    }
  });
});

// ELIMINAR USUARIO
userRouter.delete('/delete', async (req, res) => {
  const { id } = req.body;

  await mysqlConnection.query(`UPDATE user SET is_deleted=${is_deleted} WHERE id=${id};`, (err) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      res.json({ status: 'OK' });
    }
  });
});


module.exports = userRouter;