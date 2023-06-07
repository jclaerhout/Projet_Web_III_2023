const express = require('express');
const router = express.Router();
const multer = require('multer');
const userCtrl = require('../controllers/user');
const userPhoto = require('../controllers/Ajout-photo');
const { upload } = require('../middlewares/photo')
const path = require("path");

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getUserId', userCtrl.getUserId);
router.put('/addPhoto', userPhoto.addPhoto);
router.post('/uploadPhoto', upload.single('image'), userPhoto.uploadPhoto, (req, res) => {
    res.status(200).json({ message: 'Photo uploaded successfully' });
});
router.post('/getLink', userPhoto.getLink);

module.exports = router;