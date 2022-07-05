<script>
	import EggCard from '$lib/component/egg/EggCard.svelte';
	import { fade } from 'svelte/transition';
	export let eggs;
	export let contract;
	export let loadPage;
	export let pages;
</script>

<div class="mt-4 mb-4 w-100 ta-c">
	<h1>Your Eggs</h1>

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

<div class="row">
	{#if eggs.length}
		{#each eggs as egg}
			<div class="col" transition:fade={{ delay: 500 }}>
				<EggCard {egg} {contract} />
			</div>
		{/each}
	{:else}
		<h2>Not Eggs found</h2>
	{/if}
</div>

<style>

	.btn-light{
		font-weight: 700;
		color:grey;
	}

	.btn-light:hover {		
		color:black;
	}

</style>