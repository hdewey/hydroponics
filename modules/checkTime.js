let date = new Date();

const isMorning = async () => {
  let hours = date.getHours()
  if (hours < 8 || hours > 21) {
    return false
  } else {
    return true
  }
}

module.exports.time = isMorning;
