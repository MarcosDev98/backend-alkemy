require('dotenv').config();
const { createConnection } = require('mysql');
const { promisify } =  require('util');


const mysqlConnection =  createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fisura20',
  database: 'alkemy_fullstack'
});


mysqlConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DB is Connected');
  }
    
  return;
    
});

mysqlConnection.query = promisify(mysqlConnection.query);

module.exports = mysqlConnection;
