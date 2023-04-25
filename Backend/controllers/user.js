const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../pool');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const { name, firstname, email, location, job } = req.body;
            let conn;
            try{
                conn = pool.getConnection();
                const rows = pool.query(
                    'INSERT INTO users (name, firstname, email, password, location, job) VALUES (?, ?, ?, ?, ?, ?)', 
                    [name, firstname, email, hash, location, job],
                    (error, results) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('Erreur de sauvegarde de l utilisateur');
                    } else {
                        res.send('Utilisateur sauvegardé');
                    }
                    })
            }
            catch(e){
            console.log(e);
            }
        });
};

exports.login = (req, res, next) => {
    const message = 'Bienvenue la page de login du serveur Express !';
    res.status(200).json(message);
    next();
  };