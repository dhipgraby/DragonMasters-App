<script>
	import { onInterval, Maturity, Attribute } from '$lib/helpers/utils.js';
	import { getImg, iconElement, iconAttr } from '$lib/storage/dragonImg';
	import { fade } from 'svelte/transition';
	import ProgressBar from './ProgressBar.svelte';
	import CircleMenu from '../Menus/CircleMenu.svelte';

	export let dragon;
	export let checkBtn = true;
	export let fullEnergy = null;
	export let callback = null;

	if (callback != null) onInterval(callback, 1000);

	$: _maturity = Object.keys(Maturity)[dragon.ageGroup];

	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);
	let hovering;

	function enter() {
		hovering = true;
	}

	function leave() {
		hovering = false;
	}
</script>

<div
	transition:fade={{ delay: 500 }}
	on:mouseenter={enter}
	on:mouseleave={leave}
	class="card"
	style="width: 18rem;"
>
	<div class="card-header">
		<CircleMenu {hovering} dragonProps={dragon} />

		<img src={img} alt="dragon" />
		<!-- ELEMENT -->
		<div class="pabsolute bottom10 right10">{@html element}</div>
		<!-- GENERATION -->
		<div class="pabsolute top10 left10">
			<span class="badge rounded-pill bg-light text-dark mt-2">
				<b>Gen:{dragon.dna.generation}</b>
			</span>
		</div>
		<!-- MATURITY -->
		<div class="pabsolute left10 bottom10 maturity">
			<small><i class="fas fa-seedling" />: {_maturity}</small>
		</div>
	</div>
	<div class="card-body ta-c">
		<h5 class="card-title">Dragon : #{dragon.tokenId}</h5>
		<!--   ENERGY  -->
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
		</p>
		<!--   ATTRIBUTES  -->
		<div class="row p-0 mt-2">
			{#each dragon.attributes as attribute, i}
				<div class="w-50 ta-l">
					<p>{@html iconAttr(Object.keys(Attribute)[i])}: {attribute}</p>
				</div>
			{/each}
		</div>

		<br />
		{#if checkBtn}
			<a href="/dragon/{dragon.tokenId}">
				<button class="btn btn-dark">Checkout <i class="fas fa-arrow-circle-right" /> </button>
			</a>
		{/if}
	</div>
</div>

<style>
	.maturity {
		font-size: 11px;
		text-align: center;
		background-color: #c7ffe3;
		width: fit-content;
		border-radius: 50px;
		padding: 1px 10px;
		margin: auto;
	}

	.badge {
		font-weight: 400;
		letter-spacing: 1px;
		font-size: 11px;
	}

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
		font-size: 16px;
		font-weight: 600;
		color: rgb(56, 56, 56);
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
		position: relative;
		border-radius: 20px 20px 0px 0px;
		cursor: pointer;
		padding: 20px 0px;
		background-color: #f2fffb;
		background: linear-gradient(20deg, #f2fffb, #b3b3b3);
	}

	.card-body {
		position: relative;
		text-align: center;
	}

	.card-text {
		text-align: left;
	}
</style>
