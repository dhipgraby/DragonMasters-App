<script>
	import { dragonA, dragonB, userDragons } from '$lib/storage/dragon';
	import { subSpeciesName } from '$lib/helpers/utils';	
	//COMPONENTS
	import UserDragons from './UserDragons.svelte';
	import BreedBtn from './BreedBtn.svelte';
	import DragonSelection from './DragonSelection.svelte';
	import BirthBox from './BirthBox.svelte';

	export let SubSpecies;
	export let newEggs;
	export let breedEvent;
	export let contract;
	
	$: SubSpeciesName = subSpeciesName(SubSpecies);
	let gender;
	let displayDragons = false;	
	
	
	$: dad_dragon = $dragonA;
	$: mum_dragon = $dragonB;
	$: dragons = $userDragons;

	$: Parents = {
		SubSpecies: SubSpeciesName,
		dad_dragon,
		mum_dragon,		
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
