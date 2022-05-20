<script>
	import EggToken from './EggToken.svelte';
	import DragonToken from './DragonToken.svelte';
	import Marketplace from './Marketplace.svelte';
	import { EggContract } from '$lib/contracts/EggToken';
	import { DragonContract } from '$lib/contracts/DragonToken';
	import { MarketplaceContract } from '$lib/contracts/Marketplace';
	import { onMount } from 'svelte';	
	

	let egg_contract;
	let dragon_contract;
	let marketplace_contract;

	let show = 3;

	onMount(async () => {
		egg_contract = await new EggContract();
		dragon_contract = await new DragonContract();
		marketplace_contract = await new MarketplaceContract();		
	});
</script>

<section>
	<div class="btn-group" role="group">
		<button type="button" on:click={() => show = 1 } class="btn btn-light">EGG CONTRACT</button>
		<button type="button" on:click={() => show = 2 } class="btn btn-light">DRAGON CONTRACT</button>	
		<button type="button" on:click={() => show = 3 } class="btn btn-light">MARKETPLACE</button>	
	</div>

	<!-- CREATE TAP FOR CONTRACTS INTERFACES -->

	{#if show == 1}
		<EggToken contract={egg_contract} />
	{/if}

	{#if show == 2}
		<DragonToken contract={dragon_contract} />
	{/if}
	
	{#if show == 3}
		<Marketplace contract={marketplace_contract} />
	{/if}
</section>

<style>
	.btn-group .btn {
		margin: 8px;
		font-weight: 600;
		letter-spacing: 0.8px;
		font-size: 14px;
	}

	.btn-group {
		margin-top: 20px;
		margin-bottom: 20px;
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
