const { bgGreen, white, green } = require('chalk');

function logSuccess(msg) {
  console.log(`${bgGreen(white('SUCCESS：'))} ${green(msg)}`);
}

module.exports = {
  logSuccess
};
