require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const usersRouter = require('./controllers/user');
const transactionsRouter = require('./controllers/transaction');
const typesRouter = require('./controllers/type');
const categoriesRouter = require('./controllers/category');
const loginRouter = require('./controllers/login');



app.use(cors());
app.use(express.json());
  

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/types', typesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/login', loginRouter);

const PORT = 5005;
app.listen(PORT);
console.log('listen on PORT:', PORT);
