<script>
	import { onMount } from 'svelte';
	import { onInterval, Maturity } from '$lib/helpers/utils.js';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { TokenType } from '$lib/contracts/Marketplace';
	import DragonAttributes from './DragonAttributes.svelte';
	import DragonHeaderDetails from './DragonHeaderDetails.svelte';
	import OfferInfo from './OfferInfo.svelte';
	import Energy from './Energy.svelte';
	import '$lib/css/marketplace/dragon.css';

	export let dragon;
	export let contract;
	export let callback = null;
	export let fullEnergy = null;
	// settings
	export let checkDragonBtn = true;
	export let showCircleMenu = false;
	export let removeBtn = false;
	export let removeDragon = null;

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

	$: details = {
		showCircleMenu,
		removeBtn,
		removeDragon,
		img,
		element,
		hovering,
		dragon,
		contract,
		maturity: _maturity,
		_tokenType: TokenType.Dragon
	};
</script>

<div on:mouseenter={enter} on:mouseleave={leave} class="card">
	<!-- IMAGE,GENERATION & ELEMENT -->
	<DragonHeaderDetails {...details} />
	<div class="card-body ta-c">
		<!-- ID AND SHOW OFFER TYPES -->
		<OfferInfo {dragon} />
		<!--   ENERGY  -->
		{#if dragon.energy}
			<Energy energy={dragon.energy} {fullEnergy} />
		{/if}
		<!--   ATTRIBUTES  -->
		<div class="px-4">
			<DragonAttributes attributes={dragon.attributes} />
		</div>
		{#if checkDragonBtn}
			<a href="/dragon/{dragon.tokenId}">
				<button class="btn btn-dark">Checkout <i class="fas fa-arrow-circle-right" /> </button>
			</a>
		{/if}
	</div>
</div>
