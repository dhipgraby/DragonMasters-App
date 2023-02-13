<script>
	import EggCard from '$lib/component/egg/EggCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';
	import { ColumnSizes } from '$lib/css/grid';
	
	export let eggs;
	export let displayOwner = false;
	export let settingsMenu;
	export let contract;
	export let loadPage;

	$: totalAssets = eggs.totalOwned;

</script>

<div class="w-100 ta-l">
	<h1>Your Eggs</h1>
</div>

	<Pagination {totalAssets} {loadPage} inferfaceName="Egg" />
	<hr />
<div class="row">
	{#if eggs.length}
		{#each eggs as egg}
			<div class={ColumnSizes}>
				<EggCard {settingsMenu} {displayOwner} {egg} {contract} />
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
