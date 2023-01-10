import { setAlert } from "$lib/storage/alerts";

export async function startAwaiter(txHash, callback, interval = 200) {
  console.log('starting an awaiter');
  const receipt = await web3.eth.getTransaction(txHash);
  if (receipt.blockNumber != null) {
    console.log('transaction mined successfully');
    callback()
    setAlert('transaction mined successfully', 'success');
    return;
  }

  //INTEVAL FUNCTION FOR ASK IF TRANSACTION CONFIRM EACH X SECONDS INTERVAL
  const transactionReceiptAsyncInterval = setInterval(async () => {
    const get_receipt = await web3.eth.getTransaction(txHash);
    if (get_receipt.blockNumber != null) {
      console.log('transaction mined successfully');
      callback()
      clearInterval(transactionReceiptAsyncInterval);
      setAlert('transaction mined successfully', 'success');
    } else {
      console.log('still waiting for tx: ' + txHash);
      console.log(get_receipt);
    }
  }, interval);
}
