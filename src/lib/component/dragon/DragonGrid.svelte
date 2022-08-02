<script>
	import DragonCard from '$lib/component/dragon/DragonCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';
	import { afterUpdate } from 'svelte';
	export let dragons;
	export let singleApproval;
	export let contract;
	export let loadPage;
	
	let pages;

	afterUpdate(() => {
		let totalDragonPages = Math.round(parseInt(dragons.totalOwned) / 10);
		pages = (totalDragonPages > 0) ? new Array(totalDragonPages) : []; 
		console.log(dragons)
	});

</script>

<div class="row extended mt-4 mb-4">
	<div class="col-6 ta-l">
		<h1>Your Dragons</h1>
		<Pagination {pages} {loadPage} />
	</div>
	<div class="col-6 ta-r">
		<a href="/breed" class="btn btn-danger"> Breed </a>
	</div>
</div>

<div class="row">
	{#if dragons.length}
		{#each dragons as dragon}
			<div class="col">
				<DragonCard {dragon} {contract} {singleApproval} />
			</div>
		{/each}
	{:else}
		<h2>Not dragons found</h2>
	{/if}
</div>

<style>
	.extended {
		width: 100%;
	}
</style>
