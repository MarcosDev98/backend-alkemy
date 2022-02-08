const express = require('express');
const router = express.Router();

const db = require('./database');

const app = express();

app.use(express.json());

const PORT = 5005;

app.get('/', (req, res) => {
  res.send('<h1>Hello World from root route</h1>');
});

app.get('/transaction/add', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
