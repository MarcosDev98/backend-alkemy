// AGREGAR TRANSACCION
app.post('/transaction/add', async (req, res) => {
  const { concept, amount, date, user_id, id_type_transaction, category_id } = req.body;
  

  // eslint-disable-next-line quotes
  await db.query(`INSERT INTO transaction (concept, amount, date, user_id, id_type_transaction, is_deleted, category_id) VALUES('${concept}', '${amount}', '${date}', '${user_id}', '${id_type_transaction}', '${is_not_deleted}', '${category_id}');`);
  res.send('request received');
});

  

// OBTENER TRANSACCIONES
app.get('/transaction/all', async (req, res) => {

  const transactions = await db.query('SELECT id, concept, amount, date, user_id, id_type_transaction, is_deleted, category_id FROM transaction WHERE is_deleted=?;', is_not_deleted);
  console.log(transactions);
  res.send(transactions);

});

// EIDTAR TRANSACCION
app.put('/transaction/update', async (req, res) => {
  const { id, concept, amount, date, category_id } = req.body;

  // eslint-disable-next-line quotes
  await db.query(`UPDATE transaction SET concept=${concept}, amount=${amount}, date=${date}, category_id=${category_id} WHERE id=${id};`);
  res.send('transaction updated');
});

//ELIMINAR TRANSACCION
app.delete('/transaction/delete', async (req, res) => {
  const { id } = req.body;

  // eslint-disable-next-line quotes
  const transactionDeleted =  await db.query(`UPDATE transaction SET is_deleted=? WHERE id=${id}`,is_deleted);

  console.log(transactionDeleted);
  res.send('transaction deleted');


});
