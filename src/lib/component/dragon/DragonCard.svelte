<script>
	import ProgressBar from './ProgressBar.svelte';
	import { onInterval, Maturity, Attribute } from '$lib/helpers/utils.js';
	import { getImg } from '$lib/storage/dragonImg';

	export let dragon;
	export let checkBtn = true;
	export let fullEnergy = null;
	export let callback = null;

	if (callback != null) onInterval(callback, 1000);

	$: _maturity = Object.keys(Maturity)[dragon.ageGroup];

	let img = getImg(dragon.subSpecies).idle;

</script>

<div class="card" style="width: 18rem;">
	<div class="card-header">
		<img src={img} alt="dragon" />
	</div>
	<div class="card-body">
		<h5 class="card-title">Dragon : #{dragon.tokenId}</h5>
		<hr />
		<p class="card-text">
			{#if dragon.energy}
				<b>Energy</b>
				<br />
				<ProgressBar
					emitEvent={true}
					eventName={'isReady'}
					on:isReady={fullEnergy}
					timer={dragon.energy}
					bgClass={'bg-warning'}
				/>
			{/if}
			<b>Type:</b>
			{dragon.subSpecies}
			<br />
			<b>Maturity: {_maturity}</b>
			<br />
			<b>Generation:</b>
			{dragon.dna.generation}
			<br />
			{#each dragon.attributes as attribute, i}
				<b>{Object.keys(Attribute)[i]}: {attribute}</b>
				<br />
			{/each}
		</p>
		<br />
		{#if checkBtn}
			<a href="/dragon/{dragon.tokenId}"
				><button class="btn btn-dark">Checkout <i class="fas fa-arrow-circle-right" /></button></a
			>
		{/if}
	</div>
</div>

<style>
	.btn-dark {
		width: 100%;
	}

	img {
		width: 280px;
		margin-left: auto;
		margin-right: auto;
		display: block;
	}

	p {
		font-size: 12px;
		font-weight: 600;
		color: #999999;
		margin: 0px;
	}
	.card {
		border-radius: 20px;
		margin: 10px;
		transition: 0.5s;
	}

	.card:hover {
		box-shadow: 0px 10px 20px -8px;
	}

	.card-title {
		color: #737373;
		font-size: 20px;
		font-weight: 600;
	}

	.card-header {
		border-radius: 20px 20px 0px 0px;
		cursor: pointer;
		padding: 20px 0px;
		background-color: #f2fffb;
		background: linear-gradient(20deg, #f2fffb, #b3b3b3);
	}

	.card-body {
		text-align: center;
	}

	.card-text {
		text-align: left;
	}
</style>
