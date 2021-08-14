const request = require("request");
const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWtzaGF5NDYxMCIsImEiOiJja3NhYjZvajYxZHVkMnVvY2V0aTgzMGM2In0.gMpCZDDNdr69U0sRiTCdpg&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to find location");
    } else {
      try {
        callback(null, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      } catch (error) {
        callback("Unable to find location");
      }
    }
  });
};

module.exports = geoCode;
