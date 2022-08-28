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
	import SideMenu from './sideMenu.svelte';

	let egg_contract;
	let dragon_contract;
	let marketplace_contract;
	let loanbook_contract;

	let show = 4;

	const changeView = (screen) => (show = screen);

	onMount(async () => {
		egg_contract = await new EggContract();
		dragon_contract = await new DragonContract();
		loanbook_contract = await new LoanBookContract();
		marketplace_contract = await new MarketplaceContract();
	});
</script>

<div class="row">
	<div class="col-2">
		<SideMenu {changeView} />
	</div>
	<div class="col-10 pt-5">
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
	</div>
</div>
