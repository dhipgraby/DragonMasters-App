import { writable,get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export const alertTrigger = writable([{ alertType:'success',content:'hellow Moralis!',show:false,id:0 }]);

export function setAlert(message,alertType){

    alertTrigger.update(value => {
        let alertsArray = value
        alertsArray.push(alertParser(message, alertType))
        value = alertsArray
        return value;
    });   
    
}

export function dismissAlert(id){

    let currentAlerts = get(alertTrigger)
    alertTrigger.set(currentAlerts.filter((el) => el.id != id))
}

//MESSAGE PARSER

function metamaskMessage(message) {

    if(message.message != undefined){
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