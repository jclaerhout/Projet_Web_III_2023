const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getUserId', userCtrl.getUserId);
router.put('/selectPhoto', userCtrl.selectPhoto);
router.put('/addPhoto', userCtrl.addPhoto);
router.post('/photo', userCtrl.addPhoto);

module.exports = router;