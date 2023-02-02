<script>
	import EggCard from '$lib/component/egg/EggCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';
	import { afterUpdate } from 'svelte';

	export let eggs;
	export let contract;
	export let loadPage;

	$: totalAssets = eggs.totalOwned;

	afterUpdate(() => {
		console.log(eggs);
	});
</script>

<div class="w-100 ta-l mb-3">
	<h1>Your Eggs</h1>
</div>

	<Pagination {totalAssets} {loadPage} inferfaceName="Egg" />

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

<style>
	.row div {
		text-align: -webkit-center;
	}
</style>
