const isDay = async () => {
  let date = new Date();
  let hours = date.getHours()
  if (hours < 8 || hours > 21) {
    return false
  } else {
    return true
  }
}

module.exports.isDay = isDay;
