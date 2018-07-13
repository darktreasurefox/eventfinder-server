const express = require('express');
const router = express.Router();
const {login} = require ('../controllers/user.js')
const {userAuth} = require ('../middleware/authorization')

router.post('/login', login)
router.post('/auth', userAuth, (req,res) => {
  res.status(200)
     .json({status : "success"})
})

module.exports = router;
