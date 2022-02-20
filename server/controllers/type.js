const typesRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_deleted, is_not_deleted } = require('../index');



// OBTENER TIPOS
typesRouter.get('/', async (req, res) => {
  const types = await mysqlConnection.query(`SELECT id, type, is_deleted FROM type_transaction WHERE is_deleted='${is_not_deleted}'`);
  res.send(types);
});



// AGREGAR UN TIPO
typesRouter.post('/create', async (req, res) => {
  const { type } = req.body;

  await mysqlConnection.query(`INSERT INTO type_transaction (type, is_deleted) VALUES('${type}', '${is_not_deleted}');`);
  res.send('type_transaction added');

});

// EDITAR UN TIPO
typesRouter.put('/update', async (req, res) => {
  const { id, type } = req.body;

  await mysqlConnection.query(`UPDATE type_transaction SET type=${type} WHERE id=${id}`);
  res.send('type_transaction edited');
});

// ELIMINAR UN TIPO
typesRouter.delete('/delete', async (req, res) => {
  const { id } = req.body;

  await mysqlConnection.query(`UPDATE type_transaction SET is_deleted=? WHERE id=${id};`, is_deleted);
  res.send('type deleted');
});

module.exports = typesRouter;