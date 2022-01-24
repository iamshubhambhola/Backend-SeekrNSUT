const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const app =express();

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname , 'views'));






app.listen(port , function(err){
    if(err){
        console.log('error!');
    }
    console.log("yups! expreess server is running on port : " , port);
})