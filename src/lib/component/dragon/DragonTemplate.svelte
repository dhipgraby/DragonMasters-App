<script>
	import '/static/css/Assets/SingleAsset.css';
	import { onMount } from 'svelte';
	import { Maturity } from '$lib/helpers/utils.js';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { OfferType } from '$lib/contracts/Marketplace';
	import { loadRentTerms } from '$lib/helpers/utils.js';
	import { getEth } from '$lib/helpers/utils.js';
	import { TokenType } from '$lib/contracts/MarketApproval';
	import SingleDragonLeft from './SingleDragonLeft.svelte';
	import SingleDragonRight from './SingleDragonRight.svelte';
	import RaiseAndEnergy from './RaiseAndEnergy.svelte';

	export let dragon;
	export let account;
	export let contract;
	export let isOwner = false;
	export let isForSale;
	export let isForRent;

	let dna;
	let price;
	let rentPrice;
	let rentTerms;
	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);
	let openSellOption;
	let openRentOption;
	let modaComponent;
	let doPromise = true;
	let _offerType = OfferType.ForSale;

	$: maturity = Object.keys(Maturity)[dragon.ageGroup];

	onMount(async () => {
		dna = await contract.dragon.getDna(dragon.dnaId);
		await setPrices();
	});

	async function setPrices() {
		if (isForSale === true) {
			let currentprice = dragon.sellOffer != undefined ? dragon.sellOffer.sellPrice : 0;
			price = await getEth(currentprice);
		}
		if (isForRent === true) {
			let currentprice = dragon.rentOffer != undefined ? dragon.rentOffer.rent.price : 0;
			rentPrice = await getEth(currentprice);
			rentTerms = await loadRentTerms(dragon, OfferType.ForRent);
		}
	}

	const buyToken = async () => {
		await contract['market'].buy(dragon.tokenId, TokenType.Dragon, dragon.sellOffer.sellPrice);
	};

	const rentToken = async () => {
		await contract['market'].rent(
			dragon.tokenId,
			TokenType.Dragon,
			dragon.rentOffer.rent.price,
			dragon.rentOffer.rent.deposit
		);
	};
</script>

<!-- SELL OFFER -->
<div class="row pt-5">
	<SingleDragonLeft {img} {element} {dragon} {dna} {maturity} />
	<!-- RIGHT-SIDE ->ATTRIBUTES AND RAISE -->
	<div class="col-6 rightsideBox">
		<SingleDragonRight
			bind:this={modaComponent}
			{dragon}
			{contract}
			{account}
			{isForSale}
			{isForRent}
			{isOwner}
			{openSellOption}
			{openRentOption}
			{price}
			{modaComponent}
			{buyToken}
			{rentToken}
			{rentTerms}
			{rentPrice}
			{_offerType}
			{doPromise}
		/>
		<!-- ACTIONS -->
		<RaiseAndEnergy {contract} tokenId={dragon.tokenId} ageGroup={dragon.ageGroup} />
	</div>
</div>

<style>
	.rightsideBox {
		padding: 10px 10px;
	}
</style>
