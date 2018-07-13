const User  = require ('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = { 
  userAuth : function (req,res,next) {
    let token = req.headers.token
    if (token) {
      try {
        let decoded = jwt.verify(token, process.env.jwt_key)
        var query  = User.where({ fbId : decoded.id })
        query.findOne(function (err, user) {
          if (err) {
            res.status(500)
                 .json({status : "failed", message : "internal server error"})
          } else {
            if (user == null) {
              //no user found with above email , send response user not authorized
              res.status(403)
              .json ({status : "failed", message : "user not authorized"})
            } else {
              //user authenticated
              next()
            }
          }
        })
      } catch(err) {
        res.status(400)
        .json ({status : "failed", message : "token invalid"})
      }
    } else {
      res.status(401)
      .json ({status : "failed", message : "token not found"})
    }
  }
}