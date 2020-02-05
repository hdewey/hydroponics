const schedule = require('node-schedule');

var j = schedule.scheduleJob('00 * * * * * ', function(){
  console.log('successfully run')
});
