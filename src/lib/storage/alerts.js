import { writable, get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export const alertTrigger = writable([{ alertType: 'success', content: 'hellow Moralis!', show: false, id: 0 }]);
export const txTrigger = writable([]);

export function setAlert(message, alertType) {
    alertTrigger.update(value => {
        let alertsArray = value
        alertsArray.push(alertParser(message, alertType))
        value = alertsArray
        return value;
    });
}

export function addAwaiter(txHash,action,status='pending') {
    txTrigger.update(value => {
        let txArray = value
        txArray.push(txParser(txHash,action, status))
        value = txArray
        return value;
    });
}

export function completeAwaiter(txHash) {
    let transactions = get(txTrigger)
    let updated = transactions.map((elem) => {
        if (elem.txHash == txHash) {
            console.log('matching id ' + txHash);
            elem = txParser(txHash, 'complete')
        }
        return elem
    })
    console.log('updating txs : ' + JSON.stringify(updated));    
    txTrigger.set(updated);
}


export function dismissAlert(id) {
    let currentAlerts = get(alertTrigger)
    alertTrigger.set(currentAlerts.filter((el) => el.id != id))
}

export function dismissTx(id) {
    let currentTx = get(txTrigger)
    txTrigger.set(currentTx.filter((el) => el.id != id))
}

//MESSAGE PARSER

function metamaskMessage(message) {

    if (message.message != undefined) {
        return message.message
    }

    return message

}

function alertParser(message, alertType) {

    message = metamaskMessage(message)
    var alertData = {
        show: true,
        alertType: alertType,
        content: message,
        id: uuidv4()
    }
    return alertData
}

function txParser(txHash,action, status) {
    var txData = {
        status: status,
        action:action,
        show: true,
        txHash:txHash,
        id: txHash
    }
    return txData
}