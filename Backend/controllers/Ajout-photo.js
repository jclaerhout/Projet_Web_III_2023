const fs = require('fs');
const multer  = require('multer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../pool');
const path = require("path");


exports.getUserId = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, 'your_secret_key');
    const userId = decoded.id;
    console.log(userId);
    //console.log(decoded.exp);
    res.json({ userId });
};

exports.storage = async (req, res) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../photo');
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });
    const upload = multer({storage: storage});
}

exports.addPhoto = async (req, res, next) => {
    const { userId, link, description } = req.body
    let conn;
    try{
        conn = await pool.getConnection();
        const [row] = await pool.query(
            'INSERT INTO pictures (id_user, link, description) VALUES (?, ?, ?)',
            [userId, link, description]
        );
        const user = row;

        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas." });
        }

        return res.json({ message: "La photo a été ajoutée." });
    }
    catch(e){
        console.log(e);
    }
    finally {
        if (conn) await conn.release();
    }
};

exports.uploadPhoto = function(req, res) {
    const fd = new FormData();
    fd.append('image', req.file);
    res.sendStatus(200);
};