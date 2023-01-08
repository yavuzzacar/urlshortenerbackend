const express = require('express');

const router = express();

const Url = require('../models/urlModel');

const { urlOlustur, urlGetir } = require('../controllers/urlController');

const authKontrol = require('../middleware/authKontrol');


router.use(authKontrol);

//Url oluşturma

router.post('/urlOlustur', urlOlustur);

//Url listeleme

router.get('/urlListeleme/:id', urlGetir);


module.exports = router;