<script>
	import { onInterval, Maturity, Attributes } from '$lib/helpers/utils.js';
	import { getImg, iconElement, iconAttr } from '$lib/storage/dragonImg';
	import ProgressBar from './ProgressBar.svelte';
	import CircleMenu from '../marketplace/CircleMenu.svelte';	
	import { onMount } from 'svelte';
	import { TokenType } from '$lib/contracts/Marketplace';
	import '$lib/css/marketplace/dragon.css';

	export let dragon;
	export let contract;
	export let checkBtn = true;
	export let fullEnergy = null;
	export let callback = null;

	onMount(() => {
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl);
		});
	});

	if (callback != null) onInterval(callback, 1000);

	$: _maturity = Object.keys(Maturity)[dragon.ageGroup];

	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);
	let hovering;

	const enter = () => hovering = true
	const leave = () => hovering = false
	
</script>

<div on:mouseenter={enter} on:mouseleave={leave} class="card" style="width: 18rem;">
	<div class="card-header">
		<CircleMenu {hovering} tokenProps={dragon} {contract} _tokenType={TokenType.Dragon} />

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
		<div class="row w-100">
			<div class="col m-0 ta-l">
				<h5 class="card-title">Dragon : #{dragon.tokenId}</h5>
			</div>
			{#if dragon?.offer?.sellOffer}
				<!-- FOR SALE -->
				<div class="col-3">
					<span class="badge bg-danger">For Sell</span>
				</div>
			{/if}
			{#if dragon?.offer?.rentOffer}
				<!-- FOR RENT -->
				<div class="col-3">
					<span class="badge bg-dark">For Rent</span>
				</div>
			{/if}
		</div>

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
		<div class="row p-0 mt-2 mb-2 px-4">
			{#each dragon.attributes as attribute, i}
				<div class="w-50 ta-l">
					<span class="badge bg-light dragonAttr"
						><p>{@html iconAttr(Object.keys(Attributes)[i])}: {attribute}</p></span
					>
				</div>
			{/each}
		</div>

		{#if checkBtn}
			<a href="/dragon/{dragon.tokenId}">
				<button class="btn btn-dark">Checkout <i class="fas fa-arrow-circle-right" /> </button>
			</a>
		{/if}
	</div>
</div>
