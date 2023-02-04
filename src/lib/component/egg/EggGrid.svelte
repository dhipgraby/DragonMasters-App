<script>
	import EggCard from '$lib/component/egg/EggCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';
	
	export let eggs;
	export let contract;
	export let loadPage;

	$: totalAssets = eggs.totalOwned;

</script>

<div class="w-100 ta-l mb-3">
	<h1>Your Eggs</h1>
</div>

	<Pagination {totalAssets} {loadPage} inferfaceName="Egg" />

<div class="row">
	{#if eggs.length}
		{#each eggs as egg}
			<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12">
				<EggCard {egg} {contract} />
			</div>
		{/each}
	{:else}
		<h2>Not Eggs found</h2>
	{/if}
</div>

<style>
	.row div {
		text-align: -webkit-center;
	}
</style>
