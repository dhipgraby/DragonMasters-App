<script>
	import DragonBox from './DragonBox.svelte';
	import SelectBox from './SelectBox.svelte';

	export let switchGender;
	export let showDragons;
	export let mum_dragon;
	export let dad_dragon;
	export let getEnergy;
</script>

<div class="row container" id="dragonGrid">
	{#if mum_dragon.tokenId}		
		<DragonBox
            dragonProps={mum_dragon}
            gender={mum_dragon.gender}
            switchBtn={true}
            callback={showDragons}
        />
	{:else}
		<SelectBox callback={showDragons} gender={'mum'} />
	{/if}

	<div class="col-sm-4 pointer p-1">
		<div id="dad" on:click={() => switchGender()}>
			<h1 class="egg"><i class="fas fa-exchange-alt" /></h1>
		</div>
	</div>

	{#if dad_dragon.tokenId}		
		<DragonBox
			dragonProps={dad_dragon}
			gender={dad_dragon.gender}
			switchBtn={true}
			callback={showDragons}
			{getEnergy}
		/>
	{:else}
		<SelectBox callback={showDragons} gender={'dad'} />
	{/if}
</div>

<style>
	.col-sm-4 {
		align-self: center;
	}

	.egg {
		color: #ff6d6d;
	}
</style>
