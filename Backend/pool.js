const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ephec',
    database: 'Dev_III',
  });

  module.exports = pool;