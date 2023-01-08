const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const kullanıcı = require('./routes/kullanici');
const url = require('./routes/url');
const yonlendirme=require('./routes/Resolver');
const cors = require('cors');



const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);

app.use(cors());

app.use((req,res,next)=>{

    console.log(req.path,req.method);
    next();
})



// Routes
app.use('/api/kullanici',kullanıcı);

app.use('/api/url',url);

app.use('/',yonlendirme);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("veritabanı bağlandı");
        app.listen(process.env.PORT,()=>{
            console.log(`server ${process.env.PORT} portunda başladı`);
        })
    })
    .catch(err=>{
        console.log(err);
    })




