/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");
const getMyIp = "https://api.ipify.org?format=json";
const getMyLocation = "https://freegeoip.app/json/";

const fetchMyIP = (callback) => {
  request(getMyIp, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const adress = JSON.parse(body);
    // console.log(adress["ip"]);
    callback(error, adress["ip"]);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(getMyLocation, ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const location = JSON.parse(body);
    callback(error, location);
  });
};

const fetchISSFlyOverTimes = function (lat, long, callback) {
  request("http://api.open-notify.org/iss-pass.json?lat="+ lat +"&lon=" + long, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const times = JSON.parse(body);
    callback(error, times);
  });
};

nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    //console.log('It worked! Returned IP:', ip);

    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      //console.log(`It worked! Returned location: latitude ${location.latitude} longitude ${location.longitude}`);

      fetchISSFlyOverTimes(location.latitude, location.longitude, (error, times) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }
        console.log('It worked! here are the flyover times:\n', times["response"]);

      });
    });
  })
};

module.exports = {
  fetchCoordsByIP,
  fetchMyIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};