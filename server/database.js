const mysql = require('mysql');

// promisify -> enable async/await
const { promisify } =  require('util');

const { database } =  require('./keys');

const connection = mysql.createPool(database);

connection.getConnection((err, connect) => {
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
  }

  if (connect) {
    connect.release();
    console.log('DB is Connected');
  } 

  return;

});

// Promosify callbacks querys
connection.query = promisify(connection.query);

module.exports = connection;