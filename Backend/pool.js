const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'dev3',
  });

  module.exports = pool;