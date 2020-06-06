const mongodb = require('mongodb');
var contact = require('../model/contact');


var addContactMethod = ((req,res,next)=>{
    var detail = new contact({
        email: req.body.email,
        name: req.body.name,
        contact: req.body.contact,
        admin: req.currentUser.email
    });
    
    if(req.body.email!=""||req.body.name!=""||req.body.contact!=""){
        detail.save().then((docu) =>{
            
    
            res.send({status:true,message:'data saved'});

            })

        }else{
            res.send({status:false,message:'Fill details'});
      }  
});


module.exports={addContactMethod};