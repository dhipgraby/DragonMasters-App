<script>
	import DragonBox from './DragonBox.svelte';
	import { afterUpdate } from 'svelte';

	export let hideDragons;
	export let displayDragons;
	export let dragons;
	export let gender;
	export let getEnergy

	afterUpdate(() => {	
		gender = gender;
		displayDragons = displayDragons;
	});
</script>

<div class="row container" id="dragonGrid">
	{#if displayDragons}
		<h1 class="mt-5">Choose {gender}</h1>
		{#if dragons != undefined}
			{#each dragons as dragon}
            <!-- ONLY ADULT DRAGONS -->
				{#if dragon.ageGroup == 2}
					<DragonBox dragonProps={dragon} {gender} hide={hideDragons} {getEnergy} />
				{/if}
			{/each}
		{/if}
	{/if}
</div>

<style>
	#dragonGrid {
		min-height: 50vh;
	}
</style>
