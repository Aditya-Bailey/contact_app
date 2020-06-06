const mongodb = require('mongodb');
const mongoose = require('mongoose');
// const validator = require('validator');
var contactList = new mongoose.Schema({
    email:{
        type: String,
        unique: true
    },
    
    name:{
        type: String,

        },
    
    contact:{
        type: Number,
    },
    admin:{
        type:String
    }
    
});

var contact = mongoose.model('contact',contactList);

module.exports=contact;