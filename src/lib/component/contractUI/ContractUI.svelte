<script>
	import EggToken from './EggToken.svelte';
	import DragonToken from './DragonToken.svelte';
	import Marketplace from './Marketplace.svelte';
	import { EggContract } from '$lib/contracts/EggToken';
	import { DragonContract } from '$lib/contracts/DragonToken';
	import { MarketplaceContract } from '$lib/contracts/Marketplace';
	import { LoanBookContract } from '$lib/contracts/LoanBook';
	import { onMount } from 'svelte';
	import LoanBook from './LoanBook.svelte';

	let egg_contract;
	let dragon_contract;
	let marketplace_contract;
	let loanbook_contract;

	let show = 4;

	onMount(async () => {
		egg_contract = await new EggContract();
		dragon_contract = await new DragonContract();
		loanbook_contract = await new LoanBookContract();
		marketplace_contract = await new MarketplaceContract();
		
	});
</script>

<section>

	<h1><i class="fab fa-ethereum"></i> Contracts UI </h1>

	<div class="btn-group" role="group">
		<button type="button" on:click={() => (show = 1)} class="btn btn-light"><i class="fas fa-egg"></i> EGG CONTRACT</button>
		<button type="button" on:click={() => (show = 2)} class="btn btn-light"><i class="fas fa-dragon"></i> DRAGON CONTRACT</button>
		<button type="button" on:click={() => (show = 3)} class="btn btn-light"><i class="fas fa-store"></i> MARKETPLACE</button>
		<button type="button" on:click={() => (show = 4)} class="btn btn-light"><i class="fas fa-book"></i> LOANBOOK</button>
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

	{#if show == 4}		
		<LoanBook contract={loanbook_contract} />
	{/if}
</section>

<style>

	h1 {
		font-weight: 700;
	}
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
