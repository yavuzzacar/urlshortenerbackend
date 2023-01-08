const Kullanici = require('../models/kullaniciModel');

const jwt = require('jsonwebtoken');


const tokenO=(_id)=>{
    const token= jwt.sign({_id},process.env.JWT_SECRET,{
        expiresIn:'3h'
    })
    return token;
}


const kullaniciRegister = async (req, res) => {
    const { kullaniciMail, kullaniciSifre } = req.body;

    try {
        const yeniKullanici=await Kullanici.kayıtOl(kullaniciMail, kullaniciSifre);
        const token=tokenO(yeniKullanici._id);

        res.status(201).json({ kullaniciMail, kullaniciSifre, token });

    } catch (error) {
        res.status(401).json({ message: error.message});
    }
};

const kullaniciLogin = async (req, res) => {
    const { kullaniciMail, kullaniciSifre } = req.body;

    try {
        const kullanici = await Kullanici.girisYap(kullaniciMail, kullaniciSifre);
        const token=tokenO(kullanici._id);

        res.status(200).json({ kullaniciMail, token });
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};


module.exports = {
    kullaniciRegister,
    kullaniciLogin
}