
let updater 

//EVENT HANDLER
export async function initEventListener(contractEvents,callback) {

    await initHatched(contractEvents)
    await initIncubation(contractEvents)

    updater = () => {
        return callback()
    }
}

//SETTING EVENTS  

export async function eventsHandler(event, contractEvents) {

    if (event.event == "EggIncubationStarted") EggIncubationStarted(event, contractEvents)
    if (event.event == "Hatched") Hatched(event, contractEvents)
}

// Eggs Events

async function EggIncubationStarted(event, contractEvents) {
    updater()
    await initIncubation(contractEvents)

}

async function Hatched(event, contractEvents) {    
    updater()
    await initHatched(contractEvents)
}

//INITIATORS FOR REPROGRAM EVENTS AFTER IS EMITED

async function initHatched(contractEvents) {
    await contractEvents
        .Hatched()
        .once('data', (event) => {
            console.log('Hatched-Event!');
            eventsHandler(event, contractEvents);
        })
        .on('error', console.error);
}

async function initIncubation(contractEvents) {
    await contractEvents
        .EggIncubationStarted()
        .once('data', (event) => {
            console.log('Inc-Event!');
            eventsHandler(event, contractEvents);
        })
        .on('error', console.error);
}



