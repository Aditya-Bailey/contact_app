
const mongodb = require('mongodb');
const mongoose = require('mongoose');
var Admin = require('../model/adminModel');
var jwt = require('jsonwebtoken');
var JWTSECRET = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';


var signup = ((req, res, next) =>{
    console.log(req.body.name,req.body.email,req.body.contact)
    var log = new Admin({
        name : req.body.name,
        email : req.body.email,
        contact : req.body.contact,
        password : req.body.password
    });
    Admin.findOne({email: log.email}).then((response)=>{
        if(!response){
            log.save().then((doc)=>{
                if(doc){
                    res.send({status: true, message : 'user saved'});
                }else
                {
                    res.send({status:false, message:'user not saved'});
                }
            })
        }else{
            res.send({status: false, message: 'user already exist'});
        }
    })
});

var signin=((req,res,next)=>{
    var log = {
        email: req.body.email,
        password: req.body.password
    };
        Admin.findOne({email: log.email}).then((doc)=>{
            if(doc){
           // console.log("user",doc);
            if(doc.password==log.password){
                var token = jwt.sign({ _id: doc._id }, JWTSECRET);
               res.cookie('jwtToken',token);
               if (typeof(Storage) !== "undefined") {
                localStorage.setItem("jwtToken", response.data.token);
                console.log(localStorage);
            }

               //console.log("token",req.cookies); 
                return res.json({
                    status	: 	true,
                    message	: 	'Login Successfully',
                    token : token,
                    name :  doc.name,
                    email:  doc.email,
                    contact: doc.contact
                }); 
            }else{
                res.send({status:false,message:'incorrect entry'});
            }
        }else{
            res.send({status: false, message:"user does not exist"})
        }

        })

});

var signout=((req,res,next)=>{
    
res.clearCookie('jwtToken')
var token = jwt.sign({ id:'' }, JWTSECRET);
    //console.log('signoutMethod',token);
    res.cookie('jwtToken',['',false]);
        return res.json({
            status	:	true,
            message	:	'logout successfull!',
            token	:	token,
        });
    });

var profile = ((req,res,next)=>{
    res.send({username:req.currentUser.name,useremail:req.currentUser.email});
});



module.exports = {signup,signin, profile,signout};