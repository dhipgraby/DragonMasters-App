<script>
	import DragonCard from '$lib/component/dragon/DragonCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';
	import { ColumnSizes } from '$lib/css/grid';

	export let dragons;
	export let displayOwner
	export let singleApproval;
	export let contract;
	export let loadPage;

	$: totalAssets = dragons.totalOwned;
</script>

<div class="row extended">
	<div class="col-6 ta-l">
		<h1>Your Dragons</h1>
		<Pagination {totalAssets} {loadPage} inferfaceName="Dragon" />
	</div>
	<div class="col-6 ta-r margintop">
		<a href="/breed" class="btn btn-danger"> Breed </a>
	</div>
</div>
<hr />

<div class="row">
	{#if dragons.length}
		{#each dragons as dragon}
			<div class={ColumnSizes}>
				<DragonCard {displayOwner} showCircleMenu={true} {dragon} {contract} {singleApproval} />
			</div>
		{/each}
	{:else}
		<h2>Not dragons found</h2>
	{/if}
</div>

<style>	
	.margintop {
		margin-top:56px;
	}

	.extended {
		width: 100% !important;
	}
</style>
