const express = require('express');
const app = express();

const pageRoutes = require('./routes/page');
const userRoutes = require('./routes/user');
const userSearch = require('./routes/search');
const path = require('path');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api/page',pageRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/search', userSearch);

module.exports = app;