// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

const admin = require('firebase-admin');
let serviceAccount = require('../secret.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const storage = new Storage();

async function uploadFile(name) {
  new Promise(function(resolve, reject) {
    let date = new Date();
    resolve(date)
  }).then(function(result) {
    let find = `photos/plant_${result.getHours()}-${("0" + (result.getMonth() + 1)).slice(-2)}-${("0" + result.getDate()).slice(-2)}-${result.getFullYear()}.jpg`
    let dest = `${("0" + (result.getMonth() + 1)).slice(-2)}-${("0" + result.getDate()).slice(-2)}-${result.getFullYear()}/plant_${result.getHours()}.jpg`
    return {find: find, dest: dest}
  }).then(function(result) {
    const bucketName = 'sorted-pics';
    storage.bucket(bucketName).upload(result, {
      destination: result.dest,
      gzip: true,
      metadata: {
      },
    });
    console.log(`${result.dest} uploaded to ${bucketName}.`);
  });
}

const firestore = {
  store: async (data) => {

    let db = admin.firestore();
    let docRef = db.collection(data.date).doc(data.time);

    let node = docRef.set({
      date: data.date,
      time: data.time,
      temp: data.temp,
      humidity: data.humidity,
      photo: data.photo,
    });
  }
}

module.exports.upload = uploadFile;
module.exports.firestore = firestore;
