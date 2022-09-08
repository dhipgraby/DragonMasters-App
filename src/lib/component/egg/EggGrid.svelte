<script>
	import EggCard from '$lib/component/egg/EggCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';
	import { afterUpdate } from 'svelte';
	export let eggs;
	export let contract;
	export let loadPage;

	let pages;

	afterUpdate(() => {		
		let totalEggPages = Math.round(parseInt(eggs.totalOwned) / 10);
		if (totalEggPages > 0) pages = new Array(totalEggPages);
	});
</script>

<div class="mt-4 mb-4 w-100 ta-c">
	<h1>Your Eggs</h1>
	<Pagination {pages} {loadPage} />
</div>

<div class="row">
	{#if eggs.length}
		{#each eggs as egg}
			<div class="col">
				<EggCard {egg} {contract} />
			</div>
		{/each}
	{:else}
		<h2>Not Eggs found</h2>
	{/if}
</div>
