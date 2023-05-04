const fs = require('fs');
const jwt = require('jsonwebtoken');
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
  

  exports.profil = async (req, res) => {
    let conn;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, 'your_secret_key');
    const userId = decoded.id;
    console.log(userId);
    console.log(decoded.exp);
    try {
      conn = await pool.getConnection();
      const results = await pool.query(`SELECT * FROM users WHERE id = ?`, [userId]);
      console.log(results);
      if (results.length > 0) {
        const user = results[0];
        res.json({ name: user.name, email: user.email });
      } else {
        res.status(404).send('User not found');
      }
    } catch(e) {
      console.log(e);
    } finally {
      if (conn) {
        conn.release();
      }
    }
  };