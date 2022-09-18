<script>
	import DragonCard from '$lib/component/marketplace/assets/dragon/DragonCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';
    import { TokenType } from '$lib/contracts/Marketplace';
	import { afterUpdate } from 'svelte';
	export let dragons;
	export let contract;
	export let loadPage;

	let pages = new Array(5);

	afterUpdate(() => {		
        console.log(contract)        
        // calculating total pages
		// let totalPages = Math.round(parseInt(eggs.totalOwned) / 10);
		// if (totalPages > 0) pages = new Array(totalEggPages);
	});

    const buyToken = (tokenId,price) => {
        contract['market'].buyToken(tokenId,TokenType.Dragon,price)
        
    }

</script>

<div class="mt-4 mb-4 w-100 ta-c">	
	<Pagination {pages} {loadPage} />
</div>

<div class="row">
	{#if dragons.length}
		{#each dragons as dragon}
			<div class="col-4">
				<DragonCard account={contract['market'].contract.account} {dragon} buy={buyToken} />
			</div>
		{/each}
	{:else}
		<h2>Not Dragons found</h2>
	{/if}
</div>
