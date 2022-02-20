require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const usersRouter = require('./controllers/user');
// const transactionsRouter = require('./controllers/transaction');
// const typesRouter = require('./controllers/type');
// const categoriesRouter = require('./controllers/category');
// GLOBALES

const is_deleted = 'Y';
const is_not_deleted = 'N';


app.use(cors());
app.use(express.json());
  

app.use('/api/users', usersRouter);
// app.use('/api/transactions', transactionsRouter);
// app.use('/api/type', typesRouter);
// app.use('/api/category', categoriesRouter);


app.listen(process.env.PORT);
console.log('listen on PORT:', process.env.PORT);

module.exports = is_deleted;
module.exports = is_not_deleted;