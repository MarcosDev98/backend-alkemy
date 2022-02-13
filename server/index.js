const express = require('express');
const mysql = require('mysql');
const { promisify } =  require('util');
require('dotenv').config();



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

app.use(express.json());

const PORT = 5005;

app.get('/', (req, res) => {
  res.send('<h1>Hello World from root route</h1>');
});


// AGREGAR UNA TRANSACCION
app.post('/transaction/add', async (req, res) => {
  const { concept, amount, date, user_id, id_type_transaction } = req.body;
  const newTransaction = {
    concept,
    amount,
    date,
    user_id,
    id_type_transaction
  };

  await db.query('INSERT INTO transaction set ?', [newTransaction]);
  console.log(newTransaction);
  res.send('request received');
});


// OBTENER TRANSACCIONES
app.get('/transaction/all', async (req, res) => {
  const transactions = await db.query('SELECT id, concept, amount, date, user_id, id_type_transaction FROM transaction;');
  console.log(transactions);
  res.send('transactions iran aca');

});


// AGREGAR UN USUARIO
app.post('/user/add', async (req, res) => {
  const { username, password, email, firstname, lastname } = req.body;

  const newUser = { username, password, email, firstname, lastname };

  await db.query('INSERT INTO user SET ?', [newUser]);
  console.log(newUser);
  res.send('user added');
});

app.put('/user/update', async (req, res) => {
  const { id, password, email, firstname, lastname } = req.body;

  //const modifyUser = { id, password, email, firstname, lastname };

  // eslint-disable-next-line quotes
  await db.query(`UPDATE user SET password=${password}, email=${email}, firstname=${firstname}, lastname=${lastname} WHERE id=${id};`);
  res.send('user updated');
});

app.delete('/user/delete', async (req, res) => {
  const { id } = req.body;

  await db.query(`UPDATE user SET is_deleted=${'Y'} WHERE id=${id};`);

  res.send('user deleted');

});


app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
