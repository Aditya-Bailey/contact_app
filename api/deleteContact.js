const mongodb = require('mongodb');
var contact = require('../model/contact');

var deleteContactMethod = ((req, res,)=>{
    contact.findOneAndRemove({email: req.body.email, admin: req.currentUser.email}).then((resp)=>{
        if(resp){
            res.send({status: true, message: 'Contact Removed'})
        }else
        {
            res.send({status:false,message:'contact not deleted'});
        }

    },(e)=>{
        res.send({status:false,message:'contact not found'});
    });
});

module.exports={deleteContactMethod};