<script>
	import { Maturity, loadRentTerms, loadOwner } from '$lib/helpers/utils.js';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { getEth } from '$lib/helpers/utils';
	import { onMount } from 'svelte';
	//CSS
	import '$lib/css/marketplace/marketplace.css';
	import '$lib/css/marketplace/dragon.css';
	import OfferBox from '../../OfferBox.svelte';
	import DragonBox from './DragonBox.svelte';

	export let dragon;
	export let account;
	export let buy;
	export let rent;
	export let _offerType;

	$: _maturity = Object.keys(Maturity)[dragon.ageGroup];

	let price;
	let owner = loadOwner(account, dragon.owner);
	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);
	let rentTerms;
	let isForSale = dragon.sellOffer !== undefined ? true : false;
	let generation = dragon.dna.generation;
	let attributes = dragon.attributes;
	$: hovering = false;

	const enter = () => {
		hovering = true;
	};
	const leave = () => (hovering = false);

	onMount(async () => {
		let currentprice = dragon.sellOffer != undefined ? dragon.sellOffer.sellPrice : 0;
		price = await getEth(currentprice);
		rentTerms = await loadRentTerms(dragon, _offerType);
	});
</script>

<div class="card" on:mouseenter={enter} on:mouseleave={leave}>
	<DragonBox {img} {element} {dragon} {generation} {_maturity} {owner} {attributes} />
	<div class="{hovering ? 'showUp' : 'hideDown'} offerDiv">
		<OfferBox {owner} {price} {rentTerms} {isForSale} {buy} {rent} {_offerType} />
	</div>
</div>

<style>
	
	.card {		
		border: solid 2px black;
	}
</style>
