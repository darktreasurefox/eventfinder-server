const router = require('express').Router()
const twitterController = require('../controllers/twitterController')

// api endpoint template (for axios use):
// http://localhost:3000/tweets?search=value
router.get('/', twitterController.searchTweets)

module.exports = router