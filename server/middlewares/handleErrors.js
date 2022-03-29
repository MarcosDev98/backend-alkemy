// eslint-disable-next-line no-unused-vars
const { response } = require('express');

const ERRORS_HANDLERS = {
  JsonWebTokenError: (response) => response.status(401).json({ error: 'token missing or invalid' }),
  DefaultError: (response) => response.status(500).json({ error: 'something was wrong' }),
  TokenExpiredError: (response) => response.status(401).json({ error: 'token expired' }),
  ER_BAD_FIELD_ERROR: (response) => response.status(400).json({ error: 'sql syntaxis error' }),
  ER_PARSE_ERROR: (response) => response.status(400).json({ error: 'error in SQL syntax' }),
  SyntaxError: (response) => response.status(500).json({ error: 'syntax error' })
};

// eslint-disable-next-line no-unused-vars
module.exports = (error, request, response, next) => {
  console.error(error.name);

  const handler = ERRORS_HANDLERS[error.name] || ERRORS_HANDLERS.DefaultError;

  handler(response,error);
  next();
};