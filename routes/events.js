const router = require('express').Router()
const eventful = require('../controllers/eventful')

router.post('/', eventful.getEvents)
router.get('/:id', eventful.getEventById)

module.exports = router