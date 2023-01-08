const Url = require('../models/urlModel');
const shortid=require('shortid');
const validator = require('validator');


const urlOlustur = async (req, res) => {
    const { long_url,endDate,urlTag,kullaniciMail, } = req.body;

    let short_url ;


    if (!validator.isURL(long_url)) {
        return res.status(401).json({ message: 'Geçersiz url' });
    }
    if(!validator.isAfter(endDate?.toString())){
        return res.status(401).json({ message: 'Geçersiz tarih' });
    }
    if (!validator.isLength(urlTag,{max:10})) {
        throw new Error("Özel URL 10 karakterden fazla olamaz")
    }
    if (urlTag){
        short_url = urlTag;
    }
    else{
        short_url = shortid.generate();
    }


    try {
        const yeniUrl = new Url({ long_url:long_url, short_url:short_url, kullaniciMail: kullaniciMail, endDate: endDate, urlTag: urlTag});
        await yeniUrl.save();
        res.status(201).json({ long_url, short_url, kullaniciMail, endDate, urlTag  });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

const urlGetir = async (req, res) => {

    try {
        const url = await Url.find({ kullaniciMail: req.params.id });
        if (url.length > 0) {
            res.status(200).json( url );
            
        }
        else {
            res.status(400).json({ message: 'Url bulunamadı' });
        }    
        
    }
    catch (error) {
        res.status(401).json({ message: error.message }); 
    }
}

const urlYonlendirme = async (req, res) => {
    try{

    const targetUrl = await Url.findOne({ short_url: req.params.short_url });

    if(targetUrl){
        targetUrl.clicks++;
        await targetUrl.save();
        return res.redirect(301,targetUrl.long_url);
    }
    
    }
    catch(error){
        res.status(505).send("server error"+error.message);
    }
}





// url Kısaltma
const shortUrl=async(urlTag)=>{
    const encode="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let shortUrl="";
    for(let i=0;i<6;i++){
        shortUrl+=encode.charAt(Math.floor(Math.random()*encode.length));
    }
    if(urlTag){
        return shortUrl=urlTag+"_"+shortUrl;
    }
    else{
        return shortUrl;
    }
}

module.exports = {
    urlOlustur,
    urlGetir,
    urlYonlendirme
}