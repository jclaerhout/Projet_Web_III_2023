const express = require('express');
const router = express.Router();
const pageCtrl = require('../controllers/page');

router.get('/accueil', pageCtrl.accueil);
router.get('/', pageCtrl.getAllUsers);

module.exports = router;