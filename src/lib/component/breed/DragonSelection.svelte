<script>
	import DragonBox from './DragonBox.svelte';
	import SelectBox from './SelectBox.svelte';

	export let SubSpecies;
	export let switchGender;
	export let showDragons;
	export let mum_dragon;
	export let dad_dragon;
</script>

<div class="row container" id="dragonGrid">
	{#if mum_dragon.tokenId}
		<DragonBox
			removeBtn={true}
			dragonProps={mum_dragon}
			gender={mum_dragon.gender}
			switchBtn={true}
			callback={showDragons}
		/>
	{:else}
		<SelectBox callback={showDragons} gender={'mum'} {SubSpecies} />
	{/if}

	<div class="col-sm-4 pointer p-1 ta-c">
		<div id="dad" on:click={() => switchGender()}>
			<h1 class="egg"><i class="fas fa-exchange-alt" /></h1>
		</div>
	</div>

	{#if dad_dragon.tokenId}
		<DragonBox
			removeBtn={true}
			dragonProps={dad_dragon}
			gender={dad_dragon.gender}
			switchBtn={true}
			callback={showDragons}
		/>
	{:else}
		<SelectBox callback={showDragons} gender={'dad'} {SubSpecies} />
	{/if}
</div>

<style>
	.row {
		justify-content: center;
	}
	.col-sm-4 {
		align-self: center;
	}

	.egg {
		color: #ff6d6d;
	}

	.egg:hover {
		color: black;
	}
</style>
