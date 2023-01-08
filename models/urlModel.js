const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema =  Schema({
    long_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
    },
    kullaniciMail: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        index: { expires: '0s' }
    },
    urlTag:{
        String
    }
});

module.exports = mongoose.model('Url', urlSchema);
