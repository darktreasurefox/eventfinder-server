const axios = require('axios')
const eventfulAPI = require('eventful-node')
let client = new eventfulAPI.Client('tTNPQz6V5MJz6rqp')

const getEvents = function(req, res) {
  let currDate = (new Date().getDate()).toString()
  let tomorrow = (new Date().getDate() + 1).toString()
  let { keywords, location } = req.body
  client.searchEvents({
    keywords, 
    location,
    date: `201807${currDate}00-201807${tomorrow}00`
  }, function(err, data) {
    if (err) {
      console.error(err)
      res.json({message: 'error', err})
    } else {
      // console.log('---> total items',data.search.total_items)
      res
        .json({
            message: 'success',
            total_items: data.search.total_items,
            events: data.search.events.event
          })
    }
  })

  // axios.get('http://api.eventful.com/rest/events/search?...&keywords=music&location=San+Diego&date=Future')
  //   .then(response => {
  //     console.log(response.data)
  //     res.json({data: JSON.stringify(response.data)})
  //   })
  //   .catch(err => {
  //     console.error(err)
  //     res.json({message: 'error', err})
  //   }) // where to put app key?
}

const getEventById = function(req, res) {
  let eventId = req.params.id
  client.searchEvents({
    key: eventId
  }, function(err, data) {
    if (err) {
      res.json({msg: 'err', err})
      console.error(err)
    } else {
      res.json({msg: 'success', data})
      console.log(data)
    }
  })
}

module.exports = {
  getEvents,
  getEventById
}