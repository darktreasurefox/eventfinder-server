const User = require('../models/user');
const FB = require('fb');
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  login : function (req,res) {
    FB.setAccessToken(req.body.token)
    FB.api('me', { fields: ['id', 'name', 'email'], access_token: req.body.token }, function (resFB) {
      //find wether the response email already in database or not
      var query  = User.where({ email: resFB.email })
      query.findOne(function (err, user) {
        if (err) {
          res.status(500)
              .json({message : "internal server error"})
        } else {
          if (user == null) {
            //no user found with above email, register the user
            let newUser = {
              fbId : resFB.id,
              name : resFB.name,
              email : resFB.email,
            }
            User.create(newUser, function (err, book) {
              if (err) {
                res.status(500)
                    .json({message : "internal server error"})
              } else {
                let token = jwt.sign({id : resFB.id, name : resFB.name, email : resFB.email}, process.env.jwt_key)
                res.status(200)
                    .json({message : "successfully login/register" , token : token})
              }
            })
          } else {
            let token = jwt.sign({id : resFB.id, name : resFB.name, email : resFB.email}, process.env.jwt_key)
            res.status(200)
                .json({message : "successfully login/register" , token : token})
          }
        }
      })
    })
  }
}