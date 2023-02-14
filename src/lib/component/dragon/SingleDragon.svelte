<script>
	import '/static/css/Assets/SingleAsset.css';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { Maturity } from '$lib/helpers/utils.js';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import OfferBtn from '$lib/component/marketplace/OfferBtn.svelte';
	import OfferTerms from '$lib/component/marketplace/OfferTerms.svelte';
	import DragonAttributes from './DragonAttributes.svelte';
	import RaiseAndEnergy from './RaiseAndEnergy.svelte';
	import About from './About.svelte';

	const dispatch = createEventDispatcher();

	export let dragon;
	export let account;
	export let contract;
	export let isOwner = false;
	export let isForSale;
	export let isForRent;

	let dna;
	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);

	$: maturity = Object.keys(Maturity)[dragon.ageGroup];

	onMount(async () => {
		dna = await contract.getDna(dragon.dnaId);
		let currentprice = dragon.sellOffer != undefined ? dragon.sellOffer.sellPrice : 0;
		price = await getEth(currentprice);
		rentTerms = await loadRentTerms(dragon, _offerType);
	});
</script>

<div class="row pt-5">
	<div class="col-6 leftsideBox">
		<!-- IMG -->
		<div class="dragonBg">
			<img src={img} alt="dragon" />
			<div class="pabsolute bottom10 right10">{@html element}</div>
		</div>
		<About {dragon} {dna} {maturity} />

		<div class="attrDiv">
			<h3>Attributes</h3>
			<hr />
			<DragonAttributes attributes={dragon.attributes} />
		</div>
	</div>
	<!-- RIGHT-SIDE ->ATTRIBUTES AND RAISE -->
	<div class="col-6 rightsideBox">
		{#if isOwner && !isForSale}
			<div class="attrDiv">
				<h3>Create Offer</h3>
			</div>
		{/if}
		{#if isForSale}
			<div class="attrDiv">
				<h3>For Sale</h3>
				<hr />
				<!-- {#if isOwner}
					<button><i class="fas fa-edit" /> Edit</button>
				{/if} -->
				<!-- <OfferTerms {_offerType} {rentTerms} {isForSale} salePrice={price} /> -->
				<!-- <OfferBtn {dragon}{account} displayOwner={true} /> -->
			</div>
		{/if}
		{#if isForRent}
			<div class="attrDiv">
				<h3>For Rent</h3>
				<hr />
				<!-- {#if isOwner}
					<button><i class="fas fa-edit" /> Edit</button>
				{/if} -->
				<!-- <OfferTerms {_offerType} {rentTerms} {isForSale} salePrice={price} /> -->
				<!-- <OfferBtn {dragon}{account} displayOwner={true} /> -->
			</div>
		{/if}
		{#if isOwner}
		<!-- LOAD ACTIONS -->
			<RaiseAndEnergy {contract} tokenId={dragon.tokenId} ageGroup={dragon.ageGroup} />
		{/if}
	</div>
</div>

<style>
	.leftsideBox,
	.rightsideBox {
		padding: 10px 10px;
	}
</style>
