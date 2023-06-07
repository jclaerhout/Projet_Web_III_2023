const express = require('express');
const cors = require('cors');
const app = express();


const pageRoutes = require('./routes/page');
const userRoutes = require('./routes/user');
const path = require('path');

app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
  }
));

app.use(express.json());
app.use('/api/page',pageRoutes);
app.use('/api/user', userRoutes);

module.exports = app;