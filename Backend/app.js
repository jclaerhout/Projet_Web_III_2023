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
async function getData(query){
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(query);
    console.log(rows);
    const json = JSON.stringify(rows);
    return json
  } catch (e) {
    console.log(e);
  } finally {
    if (conn) conn.release();
  }
}

app.get('', async (req, res) => {
  const query = 'SELECT * from comments';
  const result = await getData(query);
  res.writeHead(200, {'Content-type': 'text/html'});
  res.end(result);
});

app.get('/profil', async (req, res) => {
  const query = 'SELECT * from users';
  const result = await getData(query);
  res.writeHead(200, {'Content-type': 'text/html'});
  res.end(result);
});

app.use('/login', (req, res, next) => {
  const message = 'Bienvenue la page de login du serveur Express !';
  res.status(200).json(message);
  next();
});

app.use('/profil', (req, res, next) => {
  const message = 'Voici votre profil !';
  res.status(200).json(message);
  next();
});

module.exports = app;