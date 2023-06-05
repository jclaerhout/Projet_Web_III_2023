const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require('../conn');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const { name, firstname, birthdate, email, sexe, location, favoriteEquipment, xpPro } = req.body;
            const sql = 'INSERT INTO dev3.users (name, firstname, birthdate, email, password, sexe, location, favoriteEquipment, xpPro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            con.query(
                sql,
                [name, firstname, birthdate, email, hash, sexe, location, favoriteEquipment, xpPro],
                (error, results) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('Erreur de sauvegarde de l utilisateur');
                    } else {
                        console.log(results);
                        res.send('Utilisateur sauvegardé');
                    }
                }
            );  
        });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM dev3.users WHERE email = ?';
    con.query(
        sql,
        [email],
        (error, results) => {
            if (error) {

                console.error(error);
                res.status(500).send('Erreur de connexion de l utilisateur');

            } else {
                console.log(results);
                if (results.length > 0) {
                    const user = results[0];

                    bcrypt.compare(password, user.password)
                        .then(valid => {

                            if (!valid) {
                                return res.status(401).json({ error: 'Mot de passe incorrect !' });
                            }

                            const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
                            return res.json({ token });

                        })
                        .catch(error => res.status(500).json({ error }));
                } else {
                    res.status(404).send('User not found');
                }
            }
        }
    );
};

exports.recherche = async (req, res, next) => {
    const query = req.query.search;
    let conn;
    try{
        conn = await con.getConnection();
        const result = await conn.query(
            `SELECT id, name, firstname, email,
                CASE 
                    WHEN (name LIKE ?) THEN 'names'
                    WHEN (firstname LIKE ? AND name NOT LIKE ?) THEN 'firstNames'
                    WHEN (email LIKE ?) THEN 'emails'
                END AS category
            FROM users
            WHERE (name LIKE ?) OR (firstname LIKE ? AND name NOT LIKE ?) OR (email LIKE ? AND name NOT LIKE ? AND firstname NOT LIKE ?);
        `, [`${query}%`, `${query}%`, `${query}%`, `${query}%`, `${query}%`, `${query}%`, `${query}%`, `${query}%`, `${query}%`, `${query}%`]);
        const names = result.filter(row => row.category === 'names');
        const firstNames = result.filter(row => row.category === 'firstNames');
        const emails = result.filter(row => row.category === 'emails');
        res.json({ names: names, firstNames: firstNames, emails: emails });
    }
    catch(e) { console.log(e) }
    finally {
        if (conn) {
        conn.release();
        }
    }
};

exports.fetchUser = async (req, res, next) => {
    const query = req.query.userId;
    const sql = 'SELECT u.id, u.name, u.firstname, u.email, u.location, p.link, p.description from users u left join pictures p on u.id = p.id_user WHERE u.id LIKE ? order by link desc';
    con.query(
        sql,
        [`${query}`],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur de connexion de l utilisateur');
            } else {
                const user = queryResult[0];
                console.log(user);
                res.json(user);
            }
        }
    );
};

exports.getUserId = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, 'your_secret_key');
    const userId = decoded.id;
    res.json({ userId });
  };

exports.updateUser = async (req, res, next) => {
    const { userId, lastname, firstname, birthdate, sexe, location, favoriteEquipment, xpPro } = req.body;
    const sql = 'UPDATE dev3.users SET name = ?, firstname = ?, birthdate = ?, sexe = ?, location = ?, favoriteEquipment = ?, xpPro = ? WHERE id = ?';
    con.query(
        sql,
        [lastname, firstname, birthdate, sexe, location, favoriteEquipment, xpPro, userId.userId],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur de mise à jour de l utilisateur');
            } else {
                console.log(results);
                res.send('Utilisateur mis à jour');
            }
        }
    );
};
