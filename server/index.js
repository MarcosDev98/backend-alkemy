const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { promisify } =  require('util');



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fisura20',
  database: 'alkemy_fullstack',
});



db.connect((err) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONECTION_LOST') {
      console.error('DATABASE CONNECTION WAS CLOSED');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TO MANY CONNECTIONS');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('DATABASE CONNECTION WAS REFUSE');
    }
  } else {
    console.log('DB is Connected');
  }

  return;

});

// Promosify callbacks querys
db.query = promisify(db.query);


const app = express();

app.use(cors());
app.use(express.json());


const PORT = 5005;

app.get('/', (req, res) => {
  res.send('<h1>Hello World from root route</h1>');
});

// GLOBALES

const is_deleted = 'Y';
const is_not_deleted = 'N';


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


// AGREGAR UN USUARIO
app.post('/user/add', async (req, res) => {
  const { username, password, email, firstname, lastname } = req.body;

  await db.query(`INSERT INTO user (username, password, email, firstname, lastname, is_deleted) SET VALUES('${username}', '${password}', '${email}', '${firstname}', '${lastname}', '${is_not_deleted}');`);
  res.send('user added');
});

// EDITAR USUARIO
app.put('/user/update', async (req, res) => {
  const { id, password, email, firstname, lastname } = req.body;

  // eslint-disable-next-line quotes
  await db.query(`UPDATE user SET password=${password}, email=${email}, firstname=${firstname}, lastname=${lastname} WHERE id=${id};`);
  res.send('user updated');
});

// ELIMINAR USUARIO
app.delete('/user/delete', async (req, res) => {
  const { id } = req.body;

  await db.query(`UPDATE user SET is_deleted=${is_deleted} WHERE id=${id};`);

  res.send('user deleted');

});

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


app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
