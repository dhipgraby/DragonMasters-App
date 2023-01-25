async function getEvents(EventName) {
    const events = await contract.contract.DragonToken.getPastEvents(EventName, {
        fromBlock: 0,
        toBlock: 'latest'
    });
    console.log(events);
}
