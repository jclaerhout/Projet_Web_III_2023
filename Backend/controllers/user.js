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
                        console.log(results);
                        res.send('Utilisateur sauvegardé');
                    }
                    })
            }
            catch(e){
            console.log(e);
            }
        });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    let conn;
    try{
        conn = await pool.getConnection();
        const [row] = await pool.query(
            'SELECT * FROM users WHERE email = ?', [email]
        );
        const user = row;

        if (!user) {
            return res.status(404).json({ message: "L'email ou le mot de passe est incorrect." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "L'email ou le mot de passe est incorrect." });
        }

        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

        return res.json({ token });
    }
    catch(e){
        console.log(e);
    }
    finally {
        if (conn) conn.release();
    }
};

exports.getUserId = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, 'your_secret_key');
    const userId = decoded.id;
    console.log(userId);
    //console.log(decoded.exp);
    res.json({ userId });
  };

exports.updateUser = async (req, res, next) => {
    const { userId, lastname, firstname, location } = req.body;
    let conn;
    try{
        conn = await pool.getConnection();
        const [row] = await pool.query(
            'UPDATE users SET name = ?, firstname = ?, location = ? WHERE id = ?', 
            [lastname, firstname, location, userId.userId]
        );
        const user = row;

        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas." });
        }

        return res.json({ message: "L'utilisateur a été mis à jour." });
    }
    catch(e){
        console.log(e);
    }
    finally {
        if (conn) conn.release();
    }
};