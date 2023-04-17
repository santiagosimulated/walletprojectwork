const sendEth = require('../sendEth.js');

module.exports = async () => {
  console.log('Running sendEth function on server startup...');
  sendEth();
};
