
let contract = []

$: offers = $userOffers

export async function LoadInterface(from, to, forceReload = false) {
    fromId = from;
    toId = to;
    console.log('loading interface from:' + fromId + ' to: ' + toId);
    if (eggs.length > 0 && forceReload == false) return;
    await contract['egg'].getUserEggs(fromId, toId);
    console.log('loading Eggs');
    if (dragons.length > 0 && forceReload == false) return;
    await contract['dragon'].getUserDragons(fromId, toId);
    console.log('loading Dragons');
    if (offers.length > 0 && forceReload == false) return;
    await contract['market'].getOfferedBy(fromId,toId,TokenType.Dragon)
    await contract['market'].getOfferedBy(fromId,toId,TokenType.Egg)
    console.log('offers');
    //Checking Approval
    let approveForAll = await contract['market'].isApprovedForAll();
    if (approveForAll == true) {
        singleApproval = false;
    } else {
        singleApproval = true;
    }
}