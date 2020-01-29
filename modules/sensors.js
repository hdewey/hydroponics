var sensorLib = require('node-dht-sensor');

// Setup sensor, exit if failed
var sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302
var sensorPin  = 4;  // The GPIO pin number for sensor signal
if (!sensorLib.initialize(sensorType, sensorPin)) {
    console.warn('Failed to initialize sensor');
    process.exit(1);
}

async function read() {
    let result = new Date();
    var readout = sensorLib.read();
    const date = `${result.getHours()}-${("0" + (result.getMonth() + 1)).slice(-2)}-${("0" + result.getDate()).slice(-2)}-${result.getFullYear()}`
    let justDate = await date.split('-').splice(1,3).join('-');
    let time = await date.split('-').splice(0,1).join('-');

    const data = {
      full_date: await date,
      date: await justDate,
      time: await time,
    	temp: await readout.temperature.toFixed(1),
    	humidity: await readout.humidity.toFixed(1),
      photo: await `https://storage.cloud.google.com/growth-pics/plant_${date}.jpg`
    }
    return await data
}

module.exports.sensor = read;
