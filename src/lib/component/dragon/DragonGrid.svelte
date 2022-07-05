<script>
	import DragonCard from '$lib/component/dragon/DragonCard.svelte';

	export let dragons;
	export let singleApproval;
	export let contract;
	export let loadPage;
	export let pages;

</script>

<div class="row extended mt-4 mb-4">
	<div class="col-6 ta-l">
		<h1>Your Dragons</h1>
		{#if pages}
		<div>
			<div class="btn-group mt-3" role="group">
				{#each pages as button, i}
					<button
						on:click={() => loadPage(i * 10, i * 10 + 10, true)}
						type="button"
						class="btn btn-light">{i}</button
					>
				{/each}
			</div>
		</div>
	{/if}
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
