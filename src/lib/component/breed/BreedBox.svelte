<script>
	import { onMount } from 'svelte';
	import { dragonA, dragonB } from '$lib/storage/dragon';
	import { DragonContract, userDragons } from '$lib/contracts/DragonToken';

	//COMPONENTS
	import UserDragons from './UserDragons.svelte';
	import BreedBtn from './BreedBtn.svelte';
	import DragonSelection from './DragonSelection.svelte';
	import BirthBox from './birthBox.svelte';

	
	let gender;
	let displayDragons = false;
	let breedEvent = false;
	let contract;
	
	$: dad_dragon = $dragonA;
	$: mum_dragon = $dragonB;	
	$: dragons = $userDragons;
	
	onMount(async () => {
		contract = await new DragonContract();				
		if(dragons.length > 0) return		
		await contract.getUserDragons();
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

	$: Parents = {
	 mum_dragon,
	 dad_dragon,
	 showDragons:(dragonGender) => { 
		displayDragons = true;
		gender = dragonGender;
	 }, 
	 switchGender, 
	 getEnergy: async(tokenId) => {return await contract.checkEnergy(tokenId);}  
	}

	$: DragonsInfo = {
		dragons,
		gender,
		displayDragons,
		getEnergy: async(tokenId) => {return await contract.checkEnergy(tokenId);} ,		
		hideDragons:()=>{displayDragons = false}
	}

	$: BreedInfo = {
	 mum_dragon,
	 dad_dragon,
	 breed,	
	}

</script>

{#if breedEvent}
	<BirthBox />
{:else}
	<DragonSelection {...Parents} />
	<BreedBtn {...BreedInfo} />

	<UserDragons {...DragonsInfo} />
{/if}
