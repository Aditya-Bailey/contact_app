const mongodb = require('mongodb');
var contact = require('../model/contact');

var fetchContactMethod = ((req,res,next)=>{
    var admin = req.currentUser.email;

    contact.find({admin}).then((contact)=>{
    res.status(200).send({contact});
    },(e)=>{
    res.status(404).send(e);
    });
});

module.exports={fetchContactMethod};