<script>
	import { onMount } from 'svelte';
	import { dragonA, dragonB, userDragons } from '$lib/storage/dragon';
	import { subSpeciesName } from '$lib/helpers/utils';
	import { DragonContract } from '$lib/contracts/DragonToken';
	import { initEventListener } from '$lib/contracts/events';

	//COMPONENTS
	import UserDragons from './UserDragons.svelte';
	import BreedBtn from './BreedBtn.svelte';
	import DragonSelection from './DragonSelection.svelte';
	import BirthBox from './BirthBox.svelte';

	export let SubSpecies
	$: SubSpeciesName = subSpeciesName(SubSpecies)
	let gender;
	let displayDragons = false;
	let breedEvent = false;
	let contract;
	let newEgg;

	onMount(async () => {
		// userDragons.useLocalStorage()
		contract = await new DragonContract();

		let contractEvents = await contract.contract.DragonToken.events;		
	
		const updater = (event) => {
			
			const returnValues = event.returnValues

			if(returnValues.eggIds.length > 0){
				//Manage how much eggs they are and show
			} else {
				//Show that dragons was not successfully breed.
			}
			
			newEgg = {
				eggId:event.returnValues.eggId,
				dadId:event.returnValues.dadId,
				mumId:event.returnValues.mumId,
			}		
			breedEvent = true			
		};

		await initEventListener(contractEvents, updater, 'DragonToken');

		if (dragons.length > 0) return;
		await contract.getUserDragons(0,10);		
	});

	$: dad_dragon = $dragonA;
	$: mum_dragon = $dragonB;
	$: dragons = $userDragons;

	$: Parents = {
		SubSpecies:SubSpeciesName,
		mum_dragon,
		dad_dragon,
		showDragons: (dragonGender) => {
			displayDragons = true;
			gender = dragonGender;
		},
		switchGender
	};

	$: DragonsInfo = {
		SubSpecies:SubSpeciesName,
		dragons,
		mum_dragon,
		dad_dragon,
		gender,
		displayDragons,
		getEnergy: async (tokenId) => {
			return await contract.checkEnergy(tokenId);
		},
		hideDragons: () => {
			displayDragons = false;
		}
	};

	$: BreedInfo = {
		mum_dragon,
		dad_dragon,
		breed
	};
	
	async function breed(mumId, dadId) {
		await contract.breed(mumId, dadId);
	}

	function switchGender() {
		let old_dad = dad_dragon;
		dad_dragon = mum_dragon;
		mum_dragon = old_dad;
		mum_dragon.gender = 'mum';
		dad_dragon.gender = 'dad';
		return;
	}

	async function getEvents(){
		const events = await contract.contract.DragonToken.getPastEvents('EggsLaid', { fromBlock: 0, toBlock: 'latest' });
		console.log(events);	}

</script>

<button class="btn btn-dark" on:click={getEvents}>
get events
</button>
{#if breedEvent}
	<BirthBox {...newEgg} />
{:else}
	<DragonSelection {...Parents} />
	<BreedBtn {...BreedInfo} />
	<UserDragons {...DragonsInfo} />
{/if}
