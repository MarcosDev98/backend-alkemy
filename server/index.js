require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// GLOBALES

const is_deleted = 'Y';
const is_not_deleted = 'N';


app.use(cors());
app.use(express.json());
  
app.listen(process.env.PORT);
console.log('listen on PORT:', process.env.PORT);

module.exports = is_deleted;
module.exports = is_not_deleted;