var Gpio = require('onoff').Gpio;
var lights = new Gpio(18, 'out');

const readLights = async () => {
  return await lights.read()
}

const turnOn = () => {
  lights.writeSync(1);
}

const turnOff = () => {
  lights.writeSync(0);
}


module.exports.readLights = {
  read: readLights,
  on  : turnOn,
  off : turnOff
}