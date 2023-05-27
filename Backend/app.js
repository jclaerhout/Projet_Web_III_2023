const express = require('express');
const cors = require('cors');
const app = express();


const pageRoutes = require('./routes/page');
const userRoutes = require('./routes/user');
const path = require('path');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://photo-pro.vercel.app/');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(cors({
  origin: 'https://photo-pro.vercel.app/'
}));

app.use('/api/page',pageRoutes);
app.use('/api/user', userRoutes);

module.exports = app;