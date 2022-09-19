<script>
	import DragonCard from '$lib/component/marketplace/assets/dragon/DragonCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';
    import { TokenType } from '$lib/contracts/Marketplace';
	import { afterUpdate } from 'svelte';
	export let dragons;
	export let contract;
	export let loadPage;
    export let perpage

	let pages

    afterUpdate(() => {		       
        // calculating total pages
		let totalPages = Math.round(parseInt(dragons.totalOffers) / perpage);
		if (totalPages > 0) pages = new Array(totalPages);
	});

    const buyToken = async (tokenId,price) => {
        await contract['market'].buyToken(tokenId,TokenType.Dragon,price)
        await loadPage(0,perpage)
    }

</script>

<div class="mt-4 mb-4 w-100 ta-c">	
	<Pagination {pages} {loadPage} {perpage} />
</div>

<div class="row col-sm-12">
	{#if dragons.length}
		{#each dragons as dragon}
			<div class="col-sm-3">
				<DragonCard account={contract['market'].contract.account} {dragon} buy={buyToken} />
			</div>
		{/each}
	{:else}
		<h2>Not Dragons found</h2>
	{/if}
</div>
