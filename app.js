const mongoose = require('mongoose');
var Admin   = require('./model/adminModel');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser=require("cookie-parser")
// var sign = require('/routes/api.js')
var api = require('./routes/api');
var view = require('./routes/view');
var logger = require('morgan');




var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(logger('dev'));
app.use('/api', api);
app.use('/', view);


app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, './Public')));
mongoose.connect('mongodb://localhost:27017/my_database2', { useNewUrlParser: true });

console.log("connection made");

app.listen(3000);
console.log('listening to port 3000');