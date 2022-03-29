const categoriesRouter = require('express').Router();
const mysqlConnection = require('../db');
const { is_deleted, is_not_deleted } = require('../utils/globals.js');


// OBTENER CATEGORIAS
categoriesRouter.get('/', async (req, res) => {
  await mysqlConnection.query(`SELECT id, name, is_deleted FROM category WHERE is_deleted=${is_not_deleted};`, (err, result ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      res.send(result);
    }
  });
});


// AGREGAR CATEGORIA

categoriesRouter.post('/create', async (req, res) => {
  const { name } = req.body;

  // eslint-disable-next-line quotes
  await mysqlConnection.query(`INSERT INTO category (name, is_deleted) VALUES('${name}', '${is_not_deleted}');`, (err, result ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      res.send(result);
    }
  });

});



// EDITAR CATEGORIA

categoriesRouter.put('/update', async (req, res) => {
  const { id, name } = req.body;
  
  // eslint-disable-next-line quotes
  await mysqlConnection.query(`UPDATE category SET name=${name} WHERE id=${id};`, (err, result ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      res.send(result);
    }
  });
});

// ELIMINAR CATEGORIA
categoriesRouter.delete('/delete', async (req, res) => {
  const { id } = req.body;

  await mysqlConnection.query(`UPDATE category SET is_deleted=${is_deleted} WHERE id=${id};`, (err, result ) => {
    if (err) {
      const error = { code: err.code, message: err.message };
      throw error;
    } else {
      res.send(result);
    }
  });
}); 

module.exports = categoriesRouter;