<script>
	import DragonCard from '$lib/component/dragon/DragonCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';

	export let dragons;
	export let singleApproval;
	export let contract;
	export let loadPage;
	
	$: totalAssets = dragons.totalOwned;
</script>

<div class="row extended mt-4 mb-4">
	<div class="col-6 ta-l">
		<h1>Your Dragons</h1>
		<Pagination {totalAssets} {loadPage} inferfaceName="Dragon" />
	</div>
	<div class="col-6 ta-r">
		<a href="/breed" class="btn btn-danger"> Breed </a>
	</div>
</div>

<div class="row">
	{#if dragons.length}
		{#each dragons as dragon}
			<div class="col col-lg-3 col-md-4 col-sm-6">
				<DragonCard showCircleMenu={true} {dragon} {contract} {singleApproval} />
			</div>
		{/each}
	{:else}
		<h2>Not dragons found</h2>
	{/if}
</div>

<style>
	.col {
		text-align: -webkit-center;
	}
	.extended {
		width: 100% !important;
	}
</style>
