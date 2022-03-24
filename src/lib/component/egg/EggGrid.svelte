<script>
	import EggCard from '$lib/component/egg/EggCard.svelte';

	export let eggs;
	export let contract;
</script>

<h1>Your Eggs</h1>

<div class="row">
	{#if eggs.length}
		{#each eggs as egg}
			<div class="col-md-4">
				<EggCard {egg} {contract} />
			</div>
		{/each}
	{:else}
		<h2>Not Eggs found</h2>
	{/if}
</div>


<style>
	.row {
		margin-top: 25px;
	}
</style>