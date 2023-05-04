const express = require('express');
const router = express.Router();
const pageCtrl = require('../controllers/page');
const { authenticate } = require('../middlewares/auth');

router.get('/accueil', pageCtrl.accueil);
router.get('/', pageCtrl.getAllUsers);
router.get('/profil', authenticate, pageCtrl.profil);

module.exports = router;