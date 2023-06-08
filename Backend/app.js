const express = require('express');
const app = express();
const cors = require('cors');

const pageRoutes = require('./routes/page');
const userRoutes = require('./routes/user');
const galleriesRoutes = require('./routes/galleries');
const path = require('path');

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use('/api/page',pageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/galleries', galleriesRoutes);

module.exports = app;