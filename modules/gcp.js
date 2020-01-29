// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

const admin = require('firebase-admin');
let serviceAccount = require('./secret.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const storage = new Storage();
async function uploadFile(name) {
  new Promise(function(resolve, reject) {
    let date_ob = new Date();
    resolve(date_ob)
  }).then(function(result) {
    let name = `photos/plant_${result.getHours()}-${("0" + (result.getMonth() + 1)).slice(-2)}-${("0" + result.getDate()).slice(-2)}-${result.getFullYear()}.jpg`
    return name
  }).then(function(result) {
    const bucketName = 'growth-pics';
    storage.bucket(bucketName).upload(result, {
      gzip: true,
      metadata: {
      },
    });
    console.log(`${result} uploaded to ${bucketName}.`);
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
