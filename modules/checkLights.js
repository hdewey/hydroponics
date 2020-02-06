var Gpio = require('onoff').Gpio;
var lights = new Gpio(18, 'out');

const readLights = async () => {
  return await lights.read()
}

module.exports.readLights = readLights;