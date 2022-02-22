const transactionsRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_deleted, is_not_deleted } = require('../utils/globals.js');
const jwt = require('jsonwebtoken');

// OBTENER TRANSACCIONES
transactionsRouter.get('/', async (req, res) => {

  const transactions = await mysqlConnection.query('SELECT id, concept, amount, date, user_id, id_type_transaction, is_deleted, category_id FROM transaction WHERE is_deleted=?;', is_not_deleted);
  console.log(transactions);
  res.send(transactions);

});

// AGREGAR TRANSACCION
transactionsRouter.post('/create', async (request, response) => {
  const { concept, amount, date, id_type_transaction, category_id } = request.body;
  // eslint-disable-next-line quotes

  const authorization = request.get('authorization');
  let token = '';

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  } 


  const decodedToken = jwt.verify(token, 'alkemy');

  console.log(decodedToken);

  if (!token ||  !decodedToken.id) {
    return response.status(401).json({ error: 'token inconrrecto o inexistente' });
  }

  const { id: user_id } = decodedToken;


  // TODO: verificar si existe el usuario


  await mysqlConnection.query(`INSERT INTO transaction (concept, amount, date, user_id, id_type_transaction, is_deleted, category_id) VALUES('${concept}', '${amount}', '${date}', '${user_id}', '${id_type_transaction}', '${is_not_deleted}', '${category_id}');`);

  response.send('OK, transaction created');
});

  

// EIDTAR TRANSACCION
transactionsRouter.put('/update', async (req, res) => {
  const { id, concept, amount, date, category_id } = req.body;

  // eslint-disable-next-line quotes
  await mysqlConnection.query(`UPDATE transaction SET concept=${concept}, amount=${amount}, date=${date}, category_id=${category_id} WHERE id=${id};`);
  res.send('transaction updated');
});

//ELIMINAR TRANSACCION
transactionsRouter.delete('/delete', async (req, res) => {
  const { id } = req.body;

  // eslint-disable-next-line quotes
  const transactionDeleted =  await mysqlConnection.query(`UPDATE transaction SET is_deleted=? WHERE id=${id}`,is_deleted);

  console.log(transactionDeleted);
  res.send('transaction deleted');


});

module.exports = transactionsRouter;
