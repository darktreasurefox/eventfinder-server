require('dotenv').config()
const OAuth = require('oauth').OAuth

let oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.API_KEY, // consumer (API) key
  process.env.API_SECRET, // consumer (API) secret
  '1.0A',
  null,
  'HMAC-SHA1'
);

const getTweets = function(req, res) {
  oauth.get(
    'https://api.twitter.com/1.1/statuses/home_timeline.json?count=5',
    process.env.USER_TOKEN, // user token
    process.env.USER_SECRET, // user secret
    function(err, data, response) {
      if (err) {
        console.error(err)
        res.status(400)
           .json({message: 'Timeline error', err})
      } else {
        res.status(200)
           .json(JSON.parse(data))
      }
    }
  )
}

const searchTweets = function(req, res) {
  // api endpoint template:
  // http://localhost:3000/tweets?search=value

  let { search } = req.query // get 'search' key from URL
  oauth.get(
    `https://api.twitter.com/1.1/search/tweets.json?q=${search}&count=5`,
    process.env.USER_TOKEN,
    process.env.USER_SECRET,
    function(err, data, response) {
      if (err) {
        console.error(err)
        res.status(400)
           .json({message: 'Search tweets error', err})
      } else {
        // console.log(response)
        res
          .status(200)
          .json({message: 'Search tweets success', tweets: JSON.parse(data)})
      }
    }
  )
}

module.exports = {
  getTweets,
  searchTweets
}