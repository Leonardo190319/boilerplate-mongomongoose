require('dotenv').config();
const mongoose = require('mongoose'); // Importar mongoose

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado correctamente'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Tu código Express
const express = require('express');
const app = express();

// Middleware y rutas
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

module.exports = app;


