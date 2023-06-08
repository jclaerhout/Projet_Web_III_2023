const express = require('express');
const router = express.Router();
const galleriesCtrl = require('../controllers/galleries');

router.post('/', galleriesCtrl.addGallery);
router.get('/:id_user', galleriesCtrl.getGalleriesByUserId);

module.exports = router;