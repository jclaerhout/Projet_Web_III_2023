const con = require('../conn');

exports.addGallery = async (req, res, next) => {
    const { name, description, id_user } = req.body;
    const sql = 'INSERT INTO dev3.galleries (name, description, id_user) VALUES (?, ?, ?)';
    con.query(
        sql,
        [name, description, id_user],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur de sauvegarde de la gallerie');
            } else {
                console.log(results);
                res.send('Gallerie sauvegardée');
            }
        }
    );
}

exports.getGalleriesByUserId = async (req, res, next) => {
    const { id_user } = req.params;
    const sql = 'SELECT * FROM dev3.galleries WHERE id_user = ?';
    con.query(sql, [id_user], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur lors de la récupération des galeries');
        } else {
          res.json(results);
        }
        }
    );
}