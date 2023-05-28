const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'mysql-6bb1d2c6-oc9d8d519.database.cloud.ovh.net',
    port: 20184,
    user: 'avnadmin',
    password: 'heRtW32zoNa98kjq5XFL',
    database: 'dev3',
    maxConnections: 20,
  });

  module.exports = pool;