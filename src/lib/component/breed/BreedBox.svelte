<script>
	import { onMount } from 'svelte';
	import { dragonA, dragonB } from '$lib/storage/dragon';
	import { DragonContract, userDragons } from '$lib/contracts/DragonToken';
	
	//COMPONENTS
	import UserDragons from './UserDragons.svelte';
    import BreedBtn from './BreedBtn.svelte';
	import DragonSelection from './DragonSelection.svelte';	
	import BirthBox from './birthBox.svelte';

	let mum_dragon;
	let dad_dragon;	
	let gender;
	let displayDragons = false;
	let breedEvent = false;
	let contract;
	let dragons = [];

	onMount(async () => {
		contract = await new DragonContract();
		await contract.getUserDragons();
	});

	const subscribeDragons = userDragons.subscribe((value) => {
		dragons = value;
	});

	const dadDragon = dragonA.subscribe((value) => {
		dad_dragon = value;
	});

	const mumDragon = dragonB.subscribe((value) => {
		mum_dragon = value;
	});

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

	function hideDragons() {
		displayDragons = false;
	}

	function showDragons(dragonGender) {
		displayDragons = true;
		gender = dragonGender;
	}
</script>

{#if breedEvent}
	<BirthBox />
{:else}
	<DragonSelection {mum_dragon} {dad_dragon} {showDragons} {switchGender} />
	<BreedBtn {mum_dragon} {dad_dragon} {breed} />

	<UserDragons        
        {hideDragons}
        {displayDragons}
        allDragons={dragons}
        {gender}  />
{/if}
