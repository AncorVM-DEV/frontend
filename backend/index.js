// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servicios (asegúrate de que existen estos ficheros)
const login = require('./services/login');
const items = require('./services/items');

// Endpoint raíz (para comprobar que la API está viva)
app.get('/', (req, res) => {
  res.json({ ok: true, mensaje: 'API bdgestion funcionando' });
});


app.get('/login', async function (req, res, next) {
  try {
    // Llama a la función del servicio login y le pasa la request
    const datosUsuario = await login.getUserData(req);
    res.json(datosUsuario);
  } catch (err) {
    console.error('Error en el endpoint /login', err.message);
    next(err);
  }
});

// INSERT: añadir carta
app.get('/addItem', async function (req, res, next) {
  try {
    const filasAfectadas = await items.insertData(req);
    // devolvemos directamente el número porque así lo usa el frontend
    res.json(filasAfectadas);
  } catch (err) {
    console.error('Error while inserting items', err.message);
    next(err);
  }
});

// SELECT: obtener todas las cartas
app.get('/getItems', async function (req, res, next) {
  try {
    const resultado = await items.getData();
    res.json(resultado);
  } catch (err) {
    console.error('Error while getting items', err.message);
    next(err);
  }
});

// DELETE: borrar carta por id
app.get('/deleteItem', async function (req, res, next) {
  try {
    const filasAfectadas = await items.deleteData(req);
    res.json(filasAfectadas);
  } catch (err) {
    console.error('Error while deleting items', err.message);
    next(err);
  }
});

// Puesto donde se levanta la API
const PORT = 3030;
app.listen(PORT, () => {
  console.log(`API disponible en http://localhost:${PORT}`);
});
