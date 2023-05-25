const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../pool');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const { name, firstname, birthdate, email, sexe, location, favoriteEquipment, xpPro } = req.body;
            let conn;
            try{
                conn = pool.getConnection();
                const rows = pool.query(
                    'INSERT INTO users (name, firstname, birthdate, email, password, sexe, location, favoriteEquipment, xpPro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [name, firstname, birthdate, email, hash, sexe, location, favoriteEquipment, xpPro],
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

exports.recherche = async (req, res, next) => {
    const query = req.query.search;
    let conn;
    try{
        conn = await pool.getConnection();
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
    let conn;
    try{
        conn = await pool.getConnection();
        const queryResult = await conn.query('SELECT u.id, u.name, u.firstname, u.email, u.location, p.link, p.description from users u left join pictures p on u.id = p.id_user WHERE u.id LIKE ? order by link desc', [`${query}`])
        const user = queryResult[0];
        console.log(user);
        res.json(user);
      }
      catch(e){
        console.log(e);
      } finally {
        if (conn) {
          conn.release();
        }
      }
}

exports.getUserId = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, 'your_secret_key');
    const userId = decoded.id;
    //console.log(userId);
    //console.log(decoded.exp);
    res.json({ userId });
  };

exports.updateUser = async (req, res, next) => {
    const { userId, lastname, firstname, birthdate, sexe, location, favoriteEquipment, xpPro } = req.body;
    let conn;
    try{
        conn = await pool.getConnection();
        const [row] = await pool.query(
            'UPDATE users SET name = ?, firstname = ?, birthdate = ?, sexe = ?, location = ?, favoriteEquipment = ?, xpPro = ? WHERE id = ?', 
            [lastname, firstname, birthdate, sexe, location, favoriteEquipment, xpPro, userId.userId]
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
