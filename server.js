var app = require('express')();
var http = require('http').createServer(app);

const async = require('async');

const path = require('path');
const io = require('socket.io')();
const schedule = require('node-schedule');

// modules
let photos = require('./modules/takePhoto');
let gcp = require('./modules/gcp');
let dht = require("./modules/sensors");
let time = require('./modules/checkTime');

var Gpio = require('onoff').Gpio;
var lights = new Gpio(18, 'out');

let remove    = photos.delete;
let snap      = photos.snap;
let temp      = dht.sensor;
let upload    = gcp.upload;
let firestore = gcp.firestore;
let isMorning = time.isMorning;

const turnOn = () => {
  lights.writeSync(1);
}

const turnOff = () => {
  lights.writeSync(0);
}

const cycle = (res) => {
  async.waterfall([
      function(callback) {
        console.log('---cycle-begins--------------------------------------------------------')
        snap().then(function() {
          callback();
        })
      },
      function(callback) {
          upload().then(function() {
            setTimeout(function(){ callback() }, 1000)
          })
      },
      function(callback) {
          remove().then(function() {
            callback();
          })
      },
      function(callback) {
        (async () => {
          let data = await temp();
          console.log(data)
          firestore.store(data).then(function() {
            callback();
          })
        })();
      }
    ], async function (err, result) {
      if (res) {
        res.send('photo taken, uploaded, and deleted.')
      }
      console.log('---cycle-ends---------------------------------------------------------');
  });
}

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/public/');
});

app.get('/admin/lights/on', function(req, res) {
  turnOn();
  console.log('lights on (manually)');
});

app.get('/admin/lights/off', function(req, res) {
  turnOff();
  console.log('lights off (manually)');
});

var jh = schedule.scheduleJob('@hourly', function(){
  cycle(undefined)
});

var w = schedule.scheduleJob('00 00 8 * * *', function() {
  turnOn();
  console.log('rise and shine! lights are on.')
})

var n = schedule.scheduleJob('00 00 21 * * *', function() {
  turnOff();
  console.log('goodnight... lights off for the night')
})

var m = schedule.scheduleJob('00 * * * * *', function() {
  if(isMorning) {
    turnOn();
  } else {
    turnOff();
  }
})

http.listen(8080, function(){
  console.log('raspberry pi server is listening on *:8080');
});
