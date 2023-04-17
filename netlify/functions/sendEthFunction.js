const sendEth = require('../../sendEth.js');

console.log("got here");

module.exports = async () => {
  console.log('Running sendEth function on server startup...');
  sendEth();
};
