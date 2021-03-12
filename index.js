const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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
});