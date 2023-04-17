require('dotenv').config();
const Web3 = require('web3');

const alchemyApiKey = process.env.ALCHEMY_API_KEY;
const web3 = new Web3(`https://eth-goerli.g.alchemy.com/v2/${alchemyApiKey}`);

const privateKey = process.env.PRIVATE_KEY;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

function sendEth() {
  web3.eth.getBalance(account.address, (error, balance) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);

      const amountToSend = balance; //- web3.utils.toWei('0.001', 'ether');

      if (amountToSend > 0) {
        const recipientAddress = '0xD28Ea8738AB245D0eBd08fbeC60440fa852e7CC2'; // Replace with the address you want to send ETH to
        web3.eth.getGasPrice().then((gasPrice) => {
          web3.eth.estimateGas({
            to: recipientAddress,
            value: amountToSend
          }).then((gasEstimate) => {
            const totalGasCost = gasEstimate * gasPrice;
            const nonce = web3.eth.getTransactionCount(account.address);
            const rawTransaction = {
              to: recipientAddress,
              value: amountToSend - totalGasCost,
              gas: gasEstimate,
              gasPrice: gasPrice,
              nonce: nonce
            };
            web3.eth.accounts.signTransaction(rawTransaction, privateKey).then(signedTransaction => {
              web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
                .on('transactionHash', hash => {
                  console.log(`Sent ${web3.utils.fromWei(amountToSend - totalGasCost, 'ether')} ETH to ${recipientAddress} (Tx hash: ${hash})`);
                })
                .on('error', error => {
                  console.log(error);
                });
            });
          });
        });
      } else {
        console.log('Balance is less than 0.001 ETH.');
      }
    }
  });
}

setInterval(sendEth, 2000);
