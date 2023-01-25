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
	import { getNewEgg } from '$lib/data/egg';

	export let SubSpecies;
	$: SubSpeciesName = subSpeciesName(SubSpecies);
	let gender;
	let displayDragons = false;
	let breedEvent = false;
	let contract;
	let newEggs = [];

	onMount(async () => {
		// userDragons.useLocalStorage()
		contract = await new DragonContract();

		let contractEvents = await contract.contract.DragonToken.events;

		const updater = (event) => {
			newEggs = [];
			const returnValues = event.returnValues;
			setNewEggs(returnValues, event);
			breedEvent = true;
		};

		await initEventListener(contractEvents, updater, 'DragonToken');

		if (dragons.length > 0) return;
		await contract.getUserDragons(0, 10);
	});

	$: dad_dragon = $dragonA;
	$: mum_dragon = $dragonB;
	$: dragons = $userDragons;

	$: Parents = {
		SubSpecies: SubSpeciesName,
		mum_dragon,
		dad_dragon,
		showDragons: (dragonGender) => {
			displayDragons = true;
			gender = dragonGender;
		},
		switchGender
	};

	$: DragonsInfo = {
		SubSpecies: SubSpeciesName,
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
		breed:async (mumId, dadId) => await contract.breed(mumId, dadId)
	};

	function setNewEggs(returnValues) {
		const eggIds = returnValues.eggIds;
		const provenance = returnValues.provenance;
		if (eggIds.length > 0) {
			if (eggIds[0] !== undefined) newEggs.push(getNewEgg(eggIds[0], provenance[0]));
			if (eggIds[1] !== undefined) newEggs.push(getNewEgg(eggIds[1], provenance[1]));
		}
	}

	function switchGender() {
		let old_dad = dad_dragon;
		dad_dragon = mum_dragon;
		mum_dragon = old_dad;
		mum_dragon.gender = 'mum';
		dad_dragon.gender = 'dad';
		return;
	}
</script>

{#if breedEvent}
	<BirthBox {newEggs} />
{:else}
	<DragonSelection {...Parents} />
	<BreedBtn {...BreedInfo} />
	<UserDragons {...DragonsInfo} />
{/if}
