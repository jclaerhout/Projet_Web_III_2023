const fs = require('fs');
const multer  = require('multer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../pool');
const path = require("path");
const {query} = require("express");
const  fileStorage  = require('../middlewares/photo')

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
exports.uploadPhoto = async (req, res, next) => {
    const uploadPhoto = multer({
        storage: fileStorage,
        limits: {
            fileSize: 1000000
        }
    })
};

exports.getLink = async (req, res, next) => {
    const userId = req.query.userId;
    let conn;
    try {
        conn = await pool.getConnection();
        const result  = await pool.query(
            'SELECT link from pictures WHERE id_user = ?',
            [userId]
        );
        // Récupération des noms de photos dans une variable
        const photoNames = result.map(result => result.link);
        res.json({ photoNames: photoNames });
    } catch (e) {
        console.log(e);
    } finally {
        if (conn) conn.release();
    }
};