const sendEth = require('../../sendEth');

module.exports = async () => {
  console.log('Running sendEth function on server startup...');
  sendEth();
};
