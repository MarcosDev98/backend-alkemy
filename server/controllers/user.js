const userRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_deleted, is_not_deleted } = require('../index');

// AGREGAR UN USUARIO
userRouter.post('/user/add', async (req, res) => {
  const { username, password, email, firstname, lastname } = req.body;

  await mysqlConnection.query(`INSERT INTO user (username, password, email, firstname, lastname, is_deleted) SET VALUES('${username}', '${password}', '${email}', '${firstname}', '${lastname}', '${is_not_deleted}');`);
  res.send('user added');
});

// EDITAR USUARIO
userRouter.put('/user/update', async (req, res) => {
  const { id, password, email, firstname, lastname } = req.body;

  // eslint-disable-next-line quotes
  await mysqlConnection.query(`UPDATE user SET password=${password}, email=${email}, firstname=${firstname}, lastname=${lastname} WHERE id=${id};`);
  res.send('user updated');
});

// ELIMINAR USUARIO
userRouter.delete('/user/delete', async (req, res) => {
  const { id } = req.body;

  await mysqlConnection.query(`UPDATE user SET is_deleted=${is_deleted} WHERE id=${id};`);

  res.send('user deleted');

});

