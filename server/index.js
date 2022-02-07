const express = require('express');

const app = express();

app.use(express.json());

const PORT = 5005;

app.get('/', (req, res) => {
  res.send('<h1>Hello World from root route</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
