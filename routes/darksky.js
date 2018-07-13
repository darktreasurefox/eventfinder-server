const router = require('express').Router()
const darksky = require('../controllers/darksky')

router.get('/', darksky.darkskyapi)

// [latitude],[longitude]


module.exports = router