<script>
	import EggCard from '$lib/component/EggCard.svelte';
	import { EggContract, userEggs } from '$lib/contracts/methods';
	import { DragonContract, userDragons } from '$lib/contracts/DragonToken';
	import { onMount } from 'svelte';

	let contract = [];
	let eggs = [];
	let dragons = [];

	onMount(async () => {
		contract['egg'] = await new EggContract();
		contract['dragon'] = await new DragonContract();

		await contract['egg'].getUserEggs();
		await contract['dragon'].getUserDragons();
	});

	const subscribeEggs = userEggs.subscribe((value) => {
		eggs = value;		
	});

	
	const subscribeDragons = userDragons.subscribe((value) => {
		dragons = value;
		console.log(dragons);
	});


</script>

<svelte:head>
	<title>Cave - Dragon Masters</title>
	<link href="/css/egg.css" rel="stylesheet" />
</svelte:head>

<section>
	<h1>Your Eggs</h1>

	<div class="row">
		{#if eggs.length}
			{#each eggs as egg}
				<div class="col-md-4">
					<EggCard {egg} contract={contract['egg']} />
				</div>
			{/each}
		{:else}
			<h2>Not Eggs found</h2>
		{/if}
	</div>
</section>

<style>
	h1 {
		margin-bottom: 40px;
		font-size: 56px;
		font-weight: 600;
	}

	section {
		padding-top: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
