<script>
	import DragonCard from '$lib/component/dragon/DragonCard.svelte';

	export let dragons;
	export let contract;
</script>

<h1>Your Dragons</h1>

<div class="row">
	{#if dragons.length}
		{#each dragons as dragon}
			<div class="col">
				<DragonCard {dragon} {contract} />
			</div>
		{/each}
	{:else}
		<h2>Not dragons found</h2>
	{/if}
</div>
