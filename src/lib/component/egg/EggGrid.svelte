<script>
	import EggCard from '$lib/component/egg/EggCard.svelte';

	export let eggs;
	export let contract;
</script>

<div class="mt-4 mb-4">
	<h1>Your Eggs</h1>
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
