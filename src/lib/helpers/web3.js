import { completeAwaiter } from "$lib/storage/alerts";

export async function startAwaiter(txHash, callback, interval = 200) {
  console.log('starting an awaiter');
  const receipt = await web3.eth.getTransaction(txHash);
  if (receipt.blockNumber != null) {
    callback()
    return;
  }

  //INTEVAL FUNCTION FOR ASK IF TRANSACTION CONFIRM EACH X SECONDS INTERVAL
  const transactionReceiptAsyncInterval = setInterval(async () => {
    const get_receipt = await web3.eth.getTransaction(txHash);
    if (get_receipt.blockNumber != null) {
      console.log('Awaiter done for tx: ' + txHash);
      callback()
      clearInterval(transactionReceiptAsyncInterval);
      completeAwaiter(txHash)
    } else {
      console.log(get_receipt);
    }
  }, interval);
}
