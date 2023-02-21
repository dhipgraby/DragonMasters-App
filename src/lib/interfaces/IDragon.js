import { loadContractData } from './Core';
import { get } from "svelte/store";

export async function LoadInterface(from, to, interfaceName = 'All') {

    console.log(from, to, interfaceName);

    if (from > 0) {
        from -= 1;
        to -= 1;
    }
    to -= 1

    let LoadedContracts = get(contracts)
    if (LoadedContracts.length < 1) {
        await loadContractData()
        await loadData(from, to, interfaceName)
    } else {
        await loadData(from, to, interfaceName)
    }
}
