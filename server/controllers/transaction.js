const transactionsRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_deleted, is_not_deleted } = require('../utils/globals.js');
const userExtractor = require('../middlewares/userExtractor');


// OBTENER TRANSACCIONES
transactionsRouter.get('/', async (req, res) => {

  const transactions = await mysqlConnection.query('SELECT id, concept, amount, date, user_id, id_type_transaction, is_deleted, category_id FROM transaction WHERE is_deleted=?;', is_not_deleted);
  console.log(transactions);
  res.send(transactions);

});

// AGREGAR TRANSACCION
transactionsRouter.post('/create', userExtractor, async (request, response) => {
  const { concept, amount, date, id_type_transaction } = request.body;
  
  const { user_id } = request;
  

  await mysqlConnection.query(`INSERT INTO transaction (concept, amount, date, user_id, id_type_transaction, is_deleted, category_id) VALUES('${concept}', '${amount}', '${date}', ${user_id}, '${id_type_transaction}', '${is_not_deleted}', '${0}');`);

  response.send('OK, transaction created');
});

  

// EIDTAR TRANSACCION
transactionsRouter.put('/update', userExtractor, async (request, response) => {
  const { id, concept, amount, date, category_id } = request.body;

  const { user_id } = request;

  // eslint-disable-next-line quotes
  await mysqlConnection.query(`UPDATE transaction SET concept='${concept}', amount=${amount}, date='${date}', category_id=${category_id} WHERE id=${id} AND user_id=${user_id};`);
  response.send('transaction updated');
});

//ELIMINAR TRANSACCION
transactionsRouter.delete('/delete', userExtractor, async (request, response) => {
  const { id } = request.body;

  const { user_id } = request;
  // eslint-disable-next-line quotes
  const transactionDeleted =  await mysqlConnection.query(`UPDATE transaction SET is_deleted=? WHERE id=${id} AND user_id=${user_id};`,is_deleted);

  console.log(transactionDeleted);
  response.send('transaction deleted');


});

module.exports = transactionsRouter;
