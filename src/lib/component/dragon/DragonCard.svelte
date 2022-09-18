<script>
	import { onInterval, Maturity,Attributes } from '$lib/helpers/utils.js';
	import { getImg, iconElement, iconAttr } from '$lib/storage/dragonImg';
	import ProgressBar from './ProgressBar.svelte';
	import CircleMenu from '../dragonMenu/CircleMenu.svelte';
	import '$lib/css/marketplace/dragon.css';

	export let dragon;
	export let contract
	export let singleApproval
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
	on:mouseenter={enter}
	on:mouseleave={leave}
	class="card"
	style="width: 18rem;"
>
	<div class="card-header">
		<CircleMenu {hovering} dragonProps={dragon} {singleApproval} {contract} />

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
					<p>{@html iconAttr(Object.keys(Attributes)[i])}: {attribute}</p>
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
