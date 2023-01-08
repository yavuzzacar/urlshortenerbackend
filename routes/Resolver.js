const express = require('express');
const router = express();

const { urlYonlendirme } = require('../controllers/urlController');


router.get('/:short_url', urlYonlendirme);

module.exports = router;