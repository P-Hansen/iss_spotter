const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request("https://freegeoip.app/json/" + ip);
};

const fetchISSFlyOverTimes = (body) => {
  const locations = JSON.parse(body);
  const lat = locations.latitude;
  const long = locations.longitude;
  return request("http://api.open-notify.org/iss-pass.json?lat=" + lat + "&lon=" + long);
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = nextISSTimesForMyLocation;