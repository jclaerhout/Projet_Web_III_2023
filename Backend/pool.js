const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'dev3',
    database: 'dev3',
    maxConnections: 20,
  });

  module.exports = pool;