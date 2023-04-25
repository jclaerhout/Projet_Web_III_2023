const express = require('express');
const app = express();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ephec',
  database: 'Dev_III',
})

app.use('/accueil', (req, res, next) => {
  const message = 'Bienvenue dans l\'accueil du serveur Express !';
  res.status(200).json(message);
  next();
});

// Route API qui correspond à la récupération des données users
function getData(route, table) {
  app.get(route, async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(`SELECT * FROM ${table}`);
      console.log(rows);
      const jsonS = JSON.stringify(rows);
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end(jsonS);
    } catch (e) {
      console.log(e);
    } finally {
      if (conn) conn.release();
    }
  });
}

getData('', 'users')

app.use('/login', (req, res, next) => {
  const message = 'Bienvenue la page de login du serveur Express !';
  res.status(200).json(message);
  next();
});

module.exports = app;