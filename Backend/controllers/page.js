const fs = require('fs');
const pool = require('../pool');


exports.accueil = (req, res, next) => {
    const message = 'Bienvenue dans l\'accueil du serveur Express !';
    res.status(200).json(message);
    next();
  };

  
exports.getAllUsers = async(req, res) =>{
    let conn;
    try{
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * from users')
      console.log(rows);
      const jsonS = JSON.stringify(rows);
      res.writeHead(200, {'Content-type': 'text/html'})
      res.end(jsonS);
    }
    catch(e){
      console.log(e);
    }
  };
  