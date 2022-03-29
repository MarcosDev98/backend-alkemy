const transactionsRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_deleted, is_not_deleted } = require('../utils/globals.js');
const userExtractor = require('../middlewares/userExtractor');

// OBTENER TRANSACCIONES
transactionsRouter.get('/', userExtractor, async (request, response) => {

  const { user_id } = request;

  await mysqlConnection.query(`SELECT id, concept, amount, date, user_id, id_type_transaction, is_deleted, category_id FROM transaction WHERE is_deleted='${is_not_deleted}' AND user_id=${user_id};`, (err, results ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      response.status(500).json(error);
      throw error;
    } else {
      response.send(results);
    }
  });
});

// AGREGAR TRANSACCION
transactionsRouter.post('/create', userExtractor, async (request, response) => {
  const { concept, amount, date, id_type_transaction } = request.body;
  
  const { user_id } = request;
    
  await mysqlConnection.query(`INSERT INTO transaction (concept, amount, date, user_id, id_type_transaction, is_deleted, category_id) VALUES('${concept}', ${amount}, '${date}', ${user_id}, ${id_type_transaction}, '${is_not_deleted}', '${0}');`, (err, results ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      response.send(results);
    }
  });

});

  

// EIDTAR TRANSACCION
transactionsRouter.put('/update', userExtractor, async (request, response) => {
  const { id, concept, amount, date, category_id } = request.body;

  const { user_id } = request;

  // eslint-disable-next-line quotes
  await mysqlConnection.query(`UPDATE transaction SET concept='${concept}', amount=${amount}, date='${date}', category_id=${category_id} WHERE id=${id} AND user_id=${user_id};`, (err, results ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      response.send('transaction_updated' + results);
    }
  });
});

//ELIMINAR TRANSACCION
transactionsRouter.delete('/delete', userExtractor, async (request, response) => {
  const { id } = request.body;

  const { user_id } = request;

  await mysqlConnection.query(`UPDATE transaction SET is_deleted='${is_deleted}' WHERE id=${id} AND user_id=${user_id};`, (err, results ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      response.send('transaction_deleted' + results);
    }
  });

});

module.exports = transactionsRouter;
