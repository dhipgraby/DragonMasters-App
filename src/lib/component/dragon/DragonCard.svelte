<script>
	import { onMount } from 'svelte';
	import { onInterval, Maturity, Attributes } from '$lib/helpers/utils.js';
	import { getImg, iconElement, iconAttr } from '$lib/storage/dragonImg';
	import { TokenType } from '$lib/contracts/Marketplace';
	import ProgressBar from './ProgressBar.svelte';
	import CircleMenu from '../marketplace/CircleMenu.svelte';
	import DragonAttributes from './DragonAttributes.svelte';
	import '$lib/css/marketplace/dragon.css';

	export let dragon;
	export let contract;
	export let callback = null;
	export let fullEnergy = null;
	// settings
	export let checkDragon = true;
	export let showCircleMenu = false;
	export let removeBtn = false;
	export let removeDragon = false;

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

	const enter = () => (hovering = true);
	const leave = () => (hovering = false);
</script>

<div on:mouseenter={enter} on:mouseleave={leave} class="card" style="width: 18rem;">
	<div class="card-header">
		{#if showCircleMenu}
			<CircleMenu {hovering} tokenProps={dragon} {contract} _tokenType={TokenType.Dragon} />
		{/if}

		{#if removeBtn == true}
			<span on:click={() => removeDragon()} class="removeBtn">
				<i class="fas fa-times-circle" />
			</span>
		{/if}

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
		<div class="px-4">
			<DragonAttributes attributes={dragon.attributes} />
		</div>

		{#if checkDragon}
			<a href="/dragon/{dragon.tokenId}">
				<button class="btn btn-dark">Checkout <i class="fas fa-arrow-circle-right" /> </button>
			</a>
		{/if}
	</div>
</div>

<style>
	.removeBtn {
		font-size: 24px;
		color: rgb(0, 0, 0);
		position: absolute;
		top: 10px;
		right: 15px;
		cursor: pointer;
		transition: 0.3s;
	}

	.removeBtn:hover {
		color: rgb(240, 76, 76);
		transform: scale(1.2);
	}
</style>
