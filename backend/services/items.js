// backend/services/items.js
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// INSERT: añade una nueva carta a la tabla coleccion
async function insertData(req, res) {
  // data tiene los datos que vamos a insertar en la base de datos (req.query)
  const data = req.query;

  const sql = `
    INSERT INTO coleccion (nombre, marca, tipo, precio)
    VALUES (?, ?, ?, ?)
  `;

  const result = await db.query(sql, [
    data.nombre,
    data.marca,
    data.tipo,
    Number(data.precio),
  ]);

  // nº de filas insertadas
  return result.affectedRows;
}

// SELECT: obtiene todas las cartas de la tabla coleccion
async function getData() {
  const rows = await db.query(
    'SELECT id, nombre, marca, tipo, precio FROM coleccion',
    []
  );

  // Si no hay filas, emptyOrRows devuelve []
  const data = helper.emptyOrRows(rows);

  // Devolvemos { data: [...] } porque así lo espera el frontend
  return { data };
}

// DELETE: borra una carta por id
async function deleteData(req, res) {
  const data = req.query; // aquí viene el id ?id=XX

  const sql = 'DELETE FROM coleccion WHERE id = ?';

  const result = await db.query(sql, [Number(data.id)]);

  return result.affectedRows;
}

module.exports = {
  getData,
  insertData,
  deleteData,
};
