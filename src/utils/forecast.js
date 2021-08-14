const request = require("request");

const foreCast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=be14d8638fc7ccb84c6fe5d1a1fc5321&query=${lat},${long}`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to find the forecase");
    } else {
      callback(null, body);
    }
  });
};

module.exports = foreCast;
