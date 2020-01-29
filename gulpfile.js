var exec = require('child_process').exec;
var command = `export GOOGLE_APPLICATION_CREDENTIALS="/home/pi/Desktop/pi-server/hydroponics-2571000856b9.json"`

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');

gulp.task('start', function (done) {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'GOOGLE_APPLICATION_CREDENTIALS': '/home/pi/Desktop/pi-server/secret.json' }
  , done: done
  })
})
