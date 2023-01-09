import { setAlert } from "$lib/storage/alerts";

export async function setAwaiter(txHash) {
  const receipt = await web3.eth.getTransaction(txHash)
  console.log('Starting awaiter for Tx: ' + txHash + '<br> Receipt: ' + JSON.stringify(receipt))
  if (receipt.blockNumber != null) {
    console.log('transaction mined successfully');
    setAlert('transaction mined successfully', 'success');
    return
  }

  const transactionReceiptAsyncInterval = setInterval(
    async () => {
      const get_receipt = await web3.eth.getTransaction(txHash)
      if (get_receipt.blockNumber != null) {
        clearInterval(transactionReceiptAsyncInterval)
        console.log('transaction mined successfully');
        setAlert('transaction mined successfully', 'success');
      } else {
        console.log('still waiting for tx: ' + txHash);
        console.log(get_receipt);
      }
    },
    1000
  )
}
