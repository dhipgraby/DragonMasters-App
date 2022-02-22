<script>
	import EggCard from '$lib/component/EggCard.svelte';
	import { EggContract, userEggs } from '$lib/contracts/methods';
	import { onMount } from 'svelte';

	let contract;
	let eggs = [];

	onMount(async () => {
		contract = await new EggContract();
		await contract.getUserEggs();
	});

	const unsubscribe = userEggs.subscribe((value) => {
		eggs = value;
		console.log(eggs);
	});
</script>

<svelte:head>
	<title>Cave - Dragon Masters</title>
</svelte:head>

<section>
	<h1>Your Eggs</h1>

	<div class="row">
		{#each eggs as egg}
			<EggCard {egg} />
		{/each}
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
