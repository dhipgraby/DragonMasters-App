
export function getErrors(functionName,error){

    let newMsg = ""
    error = String(error)

    switch (functionName) {
        case 'checkIncubation':
            newMsg = checkIncubationError(error,functionName)
            break;            

        default:
            newMsg = "Error at " + functionName
            break;
    }    

    return newMsg

}

function checkIncubationError(error,functionName){

    let msg = "Error at " + functionName

    if(error.includes("nonexistent"))  msg = "Token Not exist"
    if(error.includes("Not begun"))  msg = "Incubation not started"
    
    return msg


}