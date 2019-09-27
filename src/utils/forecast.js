const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/4fd8d7d3e3b9f78f80abd77d6fa46dbf/${latitude},${longitude}?units=si`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('probably some bud stuff', undefined);
    } else if (response.body.error) {
      callback(response.body.error);
    } else {
      callback(undefined, {
        message:
          response.body.daily.data[0].summary +
          ' It is currently ' +
          response.body.currently.temperature +
          ' degress out' +
          'There is ' +
          response.body.currently.precipProbability +
          '  chance of raining'
      });
    }
  });
};

module.exports = forecast;
