const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const kullaniciSchema =  Schema({
    kullaniciMail: {
        type: String,
        required: true,
        unique: true
    },
    kullaniciSifre: {
        type: String,
        required: true
    },
});

kullaniciSchema.statics.kayıtOl = async function(kullaniciMail, kullaniciSifre){

    const user = await this.findOne({ kullaniciMail });
    if (user) {
        throw new Error('Mail adresi zaten kullanılıyor');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedSifre = await bcrypt.hashSync(kullaniciSifre, salt);

    const yeniKullanici = await this.create({ kullaniciMail, kullaniciSifre: hashedSifre });
    return yeniKullanici;
}

kullaniciSchema.statics.girisYap = async function(kullaniciMail, kullaniciSifre) {
    const kullanici = await this.findOne({ kullaniciMail });
    if (!kullanici) {
        throw new Error('Kullanıcı bulunamadı');
    }
    const isMatch = await bcrypt.compare(kullaniciSifre, kullanici.kullaniciSifre);
    if (!isMatch) {
        throw new Error('Şifre yanlış');
    }
    return kullanici;
}

module.exports = mongoose.model('Kullanici', kullaniciSchema);