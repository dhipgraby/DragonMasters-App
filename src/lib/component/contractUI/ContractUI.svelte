<script>
	import EggToken from './EggToken.svelte';
	import DragonToken from './DragonToken.svelte';
	import Marketplace from './Marketplace.svelte';
	import Approvals from './Approvals.svelte';
	import LoanBook from './LoanBook.svelte';
	import SideMenu from './SideMenu.svelte';
	import { EggContract } from '$lib/contracts/EggToken';
	import { MarketplaceContract } from '$lib/contracts/Marketplace';
	import { LoanBookContract } from '$lib/contracts/LoanBook';
	import { onMount } from 'svelte';

	export let current;

	let egg_contract;	
	let marketplace_contract;
	let loanbook_contract;

	$: show = current;

	const changeView = (screen,newParam) => {        
        window.history.replaceState({}, '', `?current=${newParam}`);
		show = screen
	}

	onMount(async () => {
		egg_contract = await new EggContract();		
		loanbook_contract = await new LoanBookContract();
		marketplace_contract = await new MarketplaceContract();
	});
</script>

<div class="row">
	<div class="col-2">
		<SideMenu {changeView} activeItem={show} />
	</div>
	<div class="col-10 p-4">
		<!-- CREATE TAP FOR CONTRACTS INTERFACES -->
		{#if show == 1}
			<EggToken contract={egg_contract} />
		{/if}

		{#if show == 2}
			<DragonToken />
		{/if}

		{#if show == 3}
			<Marketplace contract={marketplace_contract} />
		{/if}

		{#if show == 4}
			<LoanBook contract={loanbook_contract} />
		{/if}

		{#if show == 5}
			<Approvals contract={marketplace_contract} />
		{/if}
	</div>
</div>
