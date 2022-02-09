const express = require('express');
const mysql = require('mysql');
const { promisify } =  require('util');
require('dotenv').config();



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fisura20',
  database: 'alkemy_fullstack',
});


connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});


connection.connect((err) => {
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
connection.query = promisify(connection.query);


const app = express();

app.use(express.json());

const PORT = 5005;

app.get('/', (req, res) => {
  res.send('<h1>Hello World from root route</h1>');
});

app.post('/transaction/add', async (req, res) => {
  const { concept, amount, date, type, user_id, id_type_transaction } = req.body;
  const newTransaction = {
    concept,
    amount,
    date,
    type,
    user_id,
    id_type_transaction
  };

  await db.query('INSERT INTO transaction set ?', [newTransaction]);
  res.send('request received');
});

app.get('/transaction/all', async (req, res) => {

});


app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
