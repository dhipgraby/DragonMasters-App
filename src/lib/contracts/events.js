
let updater

//EVENT HANDLER
export async function initEventListener(contractEvents, callback, contract) {


    switch (contract) {
        case 'EggToken':
            await listenEggs(contractEvents)
            break;
        case 'DragonToken':
            await initBreeding(contractEvents)
            break;
    }

    updater = (event) => {
        return callback(event)
    }
}

async function listenEggs(contractEvents) {
    await initHatched(contractEvents)
    await initIncubation(contractEvents)
}

//SETTING EVENTS  

export async function eventsHandler(event, contractEvents) {

    if (event.event == "EggIncubationStarted") EggIncubationStarted(event, contractEvents)
    if (event.event == "Hatched") Hatched(event, contractEvents)
    if (event.event == "EggLaid") EggLaid(event)
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

async function EggLaid(event) {
    console.log(event)
    updater(event)    
    //await initBreeding(contractEvents)
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

async function initBreeding(contractEvents) {
    await contractEvents
        .EggLaid()
        .once('data', (event) => {            
            eventsHandler(event, contractEvents);
        })
        .on('error', console.error);
}


