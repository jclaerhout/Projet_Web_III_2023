const fs = require('fs');
const pool = require('../pool');

exports.recherche = async (req, res, next) => {
    const query = req.query.search;
    let conn;
    try{
        conn = await pool.getConnection();
        const names = await conn.query(
            'SELECT id, name, firstname FROM users WHERE name LIKE ?',
            [`${query}%`]
        );
        const firstNames = await conn.query(
            'SELECT id, name, firstname FROM users WHERE firstname LIKE ? AND name NOT LIKE ?',
            [`${query}%`, `${query}%`]);
        res.json({ names: names, firstNames: firstNames });
    }
    catch(e) { console.log(e) }
    finally {
        if (conn) {
        conn.release();
        }
    }
};