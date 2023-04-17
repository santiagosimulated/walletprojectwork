// sendEthFunction.js
const sendEth = require('../sendEth');

exports.handler = async (event, context) => {
  sendEth();
  return {
    statusCode: 200,
    body: 'Send ETH function executed'
  };
};
