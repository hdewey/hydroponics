const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function takePhoto() {
  try {
    let date_ob = new Date();
      let name = `photos/plant_${date_ob.getHours()}-${("0" + (date_ob.getMonth() + 1)).slice(-2)}-${("0" + date_ob.getDate()).slice(-2)}-${date_ob.getFullYear()}.jpg`
      const { stdout, stderr } = await exec(`fswebcam ${name}`);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
  } catch (err) {
    console.error(err);
  };
};
async function deletePhoto() {
  try {
    let date_ob = new Date();
      let name = `photos/plant_${date_ob.getHours()}-${("0" + (date_ob.getMonth() + 1)).slice(-2)}-${("0" + date_ob.getDate()).slice(-2)}-${date_ob.getFullYear()}.jpg`
      const { stdout, stderr } = await exec(`rm ${name}`);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
  } catch (err) {
    console.error(err);
  };
};

module.exports.snap = takePhoto;
module.exports.delete = deletePhoto;
