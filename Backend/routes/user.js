const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.fetchUser);
router.get('/search', userCtrl.recherche)
router.get('/getUserId', userCtrl.getUserId);
router.put('/updateUser', userCtrl.updateUser);


module.exports = router;