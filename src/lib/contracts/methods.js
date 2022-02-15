import { setAlert } from "@lib/component/alerts";

export function mintGen0Egg() {

    try {

        await contract.EggToken.methods.mintGen0EggTo(account).send({}, function (err, txHash) {
            if (err) setAlert(err, 'warning')
            else {
                setAlert(txHash, 'success')
                return txHash
            }
        })

    } catch (err) {
        console.log("Error at: mintGen0Egg" + error)
    }
}
