const request = require('request');

var tuc = require('temp-units-conv');

var fahrenheitToCelsius = (value) =>{
  return tuc.fahrenheitToCelsius(value).toFixed(2);
}

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/a0cc10c199cc150812df82fadbdcb0e3/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if(error){
      callback('Unable to connect to Forcast.io server.');
    } else if(response.statusCode === 400){
      callback('Unable to fetch weather');
    } else if(response.statusCode === 200){
      callback(undefined, {
        temperature: fahrenheitToCelsius(body.currently.temperature),
        apparentTemperature: fahrenheitToCelsius(body.currently.apparentTemperature)
      });
    }
  });
}


module.exports.getWeather = getWeather;
