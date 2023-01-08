<script>
	import DragonCard from '$lib/component/marketplace/assets/dragon/DragonCard.svelte';
	import EggCard from '$lib/component/marketplace/assets/egg/EggCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';
	import { TokenType } from '$lib/contracts/Marketplace';
	import { afterUpdate } from 'svelte';
	export let assets;
	export let contract;
	export let loadPage;
	export let perpage;
	export let _tokenType;

	let pages;

	afterUpdate(() => {
		// calculating total pages
		let totalPages = Math.round(parseInt(assets.totalOffers) / perpage);
		if (totalPages > 0) pages = new Array(totalPages);
	});

	const buyToken = async (tokenId, price) => {
		await contract['market'].buyToken(tokenId, _tokenType, price);
		await loadPage(0, perpage);
	};
</script>

<div class="mt-4 mb-4 w-100 ta-c">
	<Pagination {pages} {loadPage} {perpage} />
</div>

<div class="row">
	{#if assets.length}
		{#each assets as asset}
			<div class="col">
				{#if _tokenType == TokenType.Dragon}
					<DragonCard account={contract['market'].contract.account} dragon={asset} buy={buyToken} />
				{/if}

				{#if _tokenType == TokenType.Egg}
					<EggCard account={contract['market'].contract.account} egg={asset} buy={buyToken} />
				{/if}
			</div>
		{/each}
	{:else}
		<h2>Not found any offers</h2>
	{/if}
</div>

<style>
	.col {
		text-align: -webkit-center;
	}
</style>
