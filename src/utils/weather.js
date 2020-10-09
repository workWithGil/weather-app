const request = require("postman-request");

const weather = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c049db8c2affcbad790313c316b4ed07&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, response) => {
    console.log(response);
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (response.body.success === false) {
      callback("Unable to process weather request.", undefined);
    } else {
      callback(undefined, {
        city: response.body.location.name,
        description: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        feelsLike: response.body.current.feelslike,
      });
    }
  });
};

module.exports = weather;
