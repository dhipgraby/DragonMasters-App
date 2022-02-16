<script>
	import { EggContract } from '$lib/contracts/methods';
	import { onMount } from 'svelte';

	let contract
	onMount(async () => {
		contract = await new Methods();		
	});
	
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<button class="btn btn-dark" on:click={() => contract.mintGen0Egg() }> MINT </button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
