const express = require('express');

const app = express();

app.use('/accueil', (req, res, next) => {
  const message = 'Bienvenue dans l\'accueil du serveur Express !';
  res.status(200).json(message);
  next();
});

app.use('/login', (req, res, next) => {
  const message = 'Bienvenue la page de login du serveur Express !';
  res.status(200).json(message);
  next();
});

module.exports = app;