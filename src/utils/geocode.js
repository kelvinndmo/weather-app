const request = require('request');

const geoCode = (adress, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(adress) +
    '.json?access_token=pk.eyJ1Ijoibm92YWsyNTQiLCJhIjoiY2p6OGRhN2hsMDIzdzNkb2I0cWI1a2UxdyJ9.eLU8XmoQnyRg2nD_sWO3iw&limit=1';

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('unable to connect to connection services', undefined);
    } else if (response.body.features.length === 0) {
      callback('unable to find location, try another search', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = {
  geocode: geoCode
};
