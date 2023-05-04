const express = require('express');
const router = express.Router();
const pageCtrl = require('../controllers/page');

router.use('/accueil', pageCtrl.accueil);
router.get('/', pageCtrl.getAllUsers);

module.exports = router;