const express = require('express');
const router = express();
const Kullanici = require('../models/kullaniciModel');
const { kullaniciRegister, kullaniciLogin } = require('../controllers/kullaniciController');


//Kayıt Olma
router.post('/kayit', kullaniciRegister);


//Giriş Yapma
router.post('/giris', kullaniciLogin);


module.exports = router;