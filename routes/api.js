var express = require('express');
var router = express.Router();
var sign = require('../api/sign');
var addContact = require('../api/addContact');
var fetchContact = require('../api/fetchContact');
var updateContact = require('../api/updateContact');
var deleteContact = require('../api/deleteContact');



var Admin = require('../model/adminModel');
var jwt = require('jsonwebtoken');
var JWTSECRET = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';


var verifyTokenAPI=function(req,res,next){
    //console.log('eeeeeeee',req.cookies.jwtToken)
    if(req.cookies.jwtToken){
      token = req.cookies.jwtToken;
      // tokenStatus	=req.cookies.jwtToken[1];
        jwt.verify(token,JWTSECRET, function(err, decoded) {
          if (err)return res.redirect('/');
          //console.log('wwwwwww',decoded);
            Admin.findOne({_id: decoded._id}).then(function(res){
              if(res==null || res=='')return res.redirect('/');
              if(res){
                //console.log('1111111111',res);
                req.currentUser = res;
                return next();
              }
            }).catch(function(err){
              return res.redirect('/');
            });
        });
    }else {
      return res.redirect('/');
    }
  };



router.post('/addContact',verifyTokenAPI,addContact.addContactMethod);
router.post('/fetchContact',verifyTokenAPI,fetchContact.fetchContactMethod);
router.post('/updateContact',verifyTokenAPI,updateContact.updateContactMethod);
router.post('/deleteContact',verifyTokenAPI,deleteContact.deleteContactMethod);
router.get('/profile',verifyTokenAPI,sign.profile);
router.get('/signout',verifyTokenAPI,sign.signout);


router.post('/signin', sign.signin)
router.post('/signup', sign.signup)



module.exports=router;