const jwt = require('jsonwebtoken');

const Kullanici = require('../models/kullaniciModel');

const authKontrol = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Yetkisiz erişim' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req.kullanici = await Kullanici.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Yetkisiz erişim' });
    }
}

module.exports = authKontrol;