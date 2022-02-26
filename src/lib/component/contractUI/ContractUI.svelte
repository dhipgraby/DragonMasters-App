<script>

	import EggToken from "./EggToken.svelte";
	import DragonToken from "./DragonToken.svelte";
	import { EggContract } from '$lib/contracts/methods';
	import { onMount } from 'svelte';
	import 'contractUI.css';

	let contract;
	let show = 1

	onMount(async () => {
		contract = await new EggContract();
	});

</script>

<section>

	<!-- CREATE TAP FOR CONTRACTS INTERFACES -->

	{#if show == 1}
		<EggToken {contract} />
	{/if}	

	{#if show == 1}
		<DragonToken {contract} />	
	{/if}	
	

	

</section>

<style>

	section {
		padding-top: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
