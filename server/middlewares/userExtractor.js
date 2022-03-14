const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const authorization = request.get('authorization');
  let token = '';

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  } 

  console.log('jwt', token);
  const decodedToken = jwt.verify(token, 'alkemy');

  if (!token ||  !decodedToken.id) {
    return response.status(401).json({ error: 'token inconrrecto o inexistente' });
  }

  const { id: user_id } = decodedToken;

  request.user_id = user_id;

  next();
};