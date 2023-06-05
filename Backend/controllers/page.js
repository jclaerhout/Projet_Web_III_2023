const fs = require('fs');
const jwt = require('jsonwebtoken');
const con = require('../conn');


exports.accueil = (req, res, next) => {
    const message = 'Bienvenue dans l\'accueil du serveur Express !';
    res.status(200).json(message);
    next();
  };

  
exports.getAllUsers = async(req, res) =>{
    const sql = 'SELECT * FROM dev3.users';
    con.query(
        sql,
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur d\'affichage des utilisateurs');
            } else {
                console.log(results);
                res.send(results);
            }
        }
    );
};
  

exports.profil = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, 'your_secret_key');
  const userId = decoded.id;
  console.log(userId);
  const sql = 'SELECT * FROM dev3.users WHERE id = ?';
  con.query(
    sql,
    [userId],
    (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur d\'affichage du profil');
        } else {
            console.log(results);
            res.send(results);
        }
    }
  );
};