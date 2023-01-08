export const transactionReceiptAsync = async function (txHash) {
    try {
      const receipt = await web3.eth.getTransactionReceipt(txHash)
      if (receipt == null) {
        throw new Error('Waiting for transaction receipt...')
      }
      return receipt
    } catch (error) {
      console.log(error);
    }
  }

export async function awaitTransactionMined (txHash, interval) {
     
    if (interval == null) {
      interval = 500
    }
  
    return new Promise((resolve, reject) => {
      const transactionReceiptAsyncInterval = setInterval(
        async () => {
          const receipt = await transactionReceiptAsync()
          if (receipt.blockNumber != null) {
            clearInterval(transactionReceiptAsyncInterval)
            console.log(receipt);
            resolve(receipt)
          } else {
            console.log('still waiting for tx: ' + txHash);
          }
        },
        interval
      )
    })
  }