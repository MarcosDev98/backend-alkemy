
// OBTENER TIPOS
app.get('/type/all', async (req, res) => {
  const types = await db.query(`SELECT id, type, is_deleted FROM type_transaction WHERE is_deleted='${is_not_deleted}'`);
  res.send(types);
});



// AGREGAR UN TIPO
app.post('/type/add', async (req, res) => {
  const { type } = req.body;

  await db.query(`INSERT INTO type_transaction (type, is_deleted) VALUES('${type}', '${is_not_deleted}');`);
  res.send('type_transaction added');

});

// EDITAR UN TIPO
app.put('/type/update', async (req, res) => {
  const { id, type } = req.body;

  await db.query(`UPDATE type_transaction SET type=${type} WHERE id=${id}`);
  res.send('type_transaction edited');
});

// ELIMINAR UN TIPO
app.delete('/type/delete', async (req, res) => {
  const { id } = req.body;

  await db.query(`UPDATE type_transaction SET is_deleted=? WHERE id=${id};`, is_deleted);
  res.send('type deleted');
});

