let mysql = require('mysql');

let con = mysql.createConnection({
  host: "34.140.233.23",
  user: "photo-pro",
  password: "Passw0rd!",
  database: "dev3"
});

con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

module.exports = con;