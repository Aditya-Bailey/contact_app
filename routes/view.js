var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var JWTSECRET = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';
var Admin = require('../model/adminModel');

var cookieParser = require('cookie-parser');


var AfterLogin = function (req, res, next) {
  var token = req.cookies.jwtToken;
  console.log('token',token);
  if (token) {
    jwt.verify(token, JWTSECRET, function (err, decoded) {
      if (err) {
        if (err.message = "jwt expired") {
          return next();
        }
        return next();
      } else {
        Admin.findOne({ _id: decoded._id }).then(function (user) {
          console.log('uuuuuuuuu', user)
          if (!user || user == '') return next()
          if (user) {
            req_currentuser = user;
            return res.redirect('/home');
          } else {
            return next();
          }
        }).catch(function (err) {
          return next();
        });
      }
    });
  } else {
    return next();
  }
};

var verifyToken = function (req, res, next) {
  //console.log('eeeeeeee',req.cookies.jwtToken)
  if (req.cookies.jwtToken) {
    token = req.cookies.jwtToken;
    // tokenStatus	=req.cookies.jwtToken[1];
    jwt.verify(token, JWTSECRET, function (err, decoded) {
      if (err) return res.redirect('/');
      console.log('wwwwwww',decoded);
      Admin.findOne({ _id: decoded._id }).then(function (res) {
        if (res == null || res == '') return res.redirect('/');
        if (res) {
          console.log('1111111111',res);
          req.currentUser = res;
          return next();
        }
      }).catch(function (err) {
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};


router.get('/', AfterLogin, (req, res, next) => {
  res.render('signin', { title: '' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: '' });
});

router.get('/home', verifyToken, (req, res, next) => {
  //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('contactlist', { title: '' });
});

router.get('/profile', verifyToken, function (req, res, next) {
  res.render('profile', { title: '' });
});

module.exports = router;