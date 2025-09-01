const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));

// Rutas FCC
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/json', (req, res) => {
  let message = "Hello json";
  if(process.env.MESSAGE_STYLE === "uppercase"){
    message = message.toUpperCase();
  }
  res.json({ message });
});

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

app.route('/name')
  .get((req, res) => {
    const { first, last } = req.query;
    res.json({ name: `${first} ${last}` });
  })
  .post((req, res) => {
    const { first, last } = req.body;
    res.json({ name: `${first} ${last}` });
  });

// Puerto
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo en el puerto " + listener.address().port);
});

module.exports = app;
