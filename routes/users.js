const express = require('express');
const router = express.Router();
const {login} = require ('../controllers/user.js')
const {userAuth} = require ('../middleware/authorization')

router.post('/login', login)

module.exports = router;
