
export function getErrors(functionName,error){

    let newMsg = 'Error at : '+ functionName

    error = String(error)
    error = JSON.parse(error.substring(error.indexOf('{'), error.lastIndexOf('}') + 1))
    
    console.log(error)
    let reason = Object.values(error.data)[0].reason
    
    if(reason == null) reason = newMsg    
    //console.log('Error at : '+ functionName)
    
    return reason

}
