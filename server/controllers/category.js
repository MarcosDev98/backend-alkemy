// AGREGAR CATEGORIA

app.post('/category/add', async (req, res) => {
  const { name } = req.body;

  // eslint-disable-next-line quotes
  await db.query(`INSERT INTO category (name, is_deleted) VALUES('${name}', '${is_not_deleted}');`);
  res.send('category added');

});

// OBTENER CATEGORIAS
app.get('/category/all', async (req, res) => {
  const categories = await db.query(`SELECT id, name, is_deleted FROM category WHERE is_deleted=${is_not_deleted};`);
  console.log(categories);
  res.send(categories);
});

// EDITAR CATEGORIA

app.put('/category/update', async (req, res) => {
  const { id, name } = req.body;
  
  // eslint-disable-next-line quotes
  await db.query(`UPDATE category SET name=${name} WHERE id=${id};`);
  
  res.send('category edited');

});

// ELIMINAR CATEGORIA
app.delete('/category/delete', async (req, res) => {
  const { id } = req.body;

  await db.query(`UPDATE category SET is_deleted=${is_deleted} WHERE id=${id};`);
  res.send('category deleted');
}); 