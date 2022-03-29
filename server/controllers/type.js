const typesRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_deleted, is_not_deleted } = require('../utils/globals.js');



// OBTENER TIPOS
typesRouter.get('/', async (req, res) => {
  await mysqlConnection.query(`SELECT id, type, is_deleted FROM type_transaction WHERE is_deleted='${is_not_deleted}';`, (err, result ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      res.send(result);
    }
  });
});



// AGREGAR UN TIPO
typesRouter.post('/create', async (req, res) => {
  const { type } = req.body;

  await mysqlConnection.query(`INSERT INTO type_transaction (type, is_deleted) VALUES('${type}', '${is_not_deleted}');`, (err, result ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      res.send(result);
    }
  });
});

// EDITAR UN TIPO
typesRouter.put('/update', async (req, res) => {
  const { id, type } = req.body;

  await mysqlConnection.query(`UPDATE type_transaction SET type=${type} WHERE id=${id}`, (err, result ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      res.send(result);
    }
  });
});

// ELIMINAR UN TIPO
typesRouter.delete('/delete', async (req, res) => {
  const { id } = req.body;

  await mysqlConnection.query(`UPDATE type_transaction SET is_deleted='${is_deleted}' WHERE id=${id};`, (err, result ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      res.send(result);
    }
  });
});

module.exports = typesRouter;