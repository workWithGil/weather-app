const request = require("postman-request");

const geocode = (address, callback) => {
  const url2 =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmlnLWdpbCIsImEiOiJja2Z1ZjF6ZDAxNjQ5Mnlud2R3Z2w5d2g5In0.PfEILHugw23fqXqcblKUcQ";

  request({ url: url2, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable to get location", undefined);
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;
