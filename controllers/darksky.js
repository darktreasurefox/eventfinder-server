var DarkSky = require('forecast.io');
var axios = require('axios')

var options = {
    APIKey: '7154cd739ca2f07553df5146fc5e9bcf',
    timeout: 1000
  },
  darksky = new DarkSky(options);

module.exports = {
    darkskyapi(req,res){
    var time = new Date() 
    var unixTime = Math.floor(time.getTime()/1000); 
    // console.log(unixTime);
    
    // darksky.getAtTime(-6.197670, 106.654727, unixTime, function (err, response, data) {
      //   if (err) throw err;
      // -6.197670,106.654727 
      //-6.17444,106.829 
      //1.2897934,103.8558166
      //   res.json(data)
      // });
      //parameter [latitude],[longitude],[time] => custom
        axios.get(`https://api.darksky.net/forecast/7154cd739ca2f07553df5146fc5e9bcf/${req.query.latitude},${req.query.longitude}`)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    }
}

