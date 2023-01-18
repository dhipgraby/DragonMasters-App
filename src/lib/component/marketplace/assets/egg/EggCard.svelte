<script>
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { onMount } from 'svelte';
	import { getEth, loadRentTerms, loadOwner } from '$lib/helpers/utils';
	import '$lib/css/marketplace/egg.css';
	import OfferBox from '../../OfferBox.svelte';
	import EggBox from './EggBox.svelte';

	export let account;
	export let egg;
	export let buy;
	export let rent;
	export let _offerType;

	let price;
	let eggImg = getImg(egg.subSpecies).egg;
	let element = iconElement(egg.subSpecies);
	let owner = loadOwner(account, egg.owner);
	let rentTerms;
	let isForSale = (egg.sellOffer !== undefined) ? true : false;

	onMount(async () => {
		let currentprice = egg.sellOffer != undefined ? egg.sellOffer.sellPrice : 0;
		price = await getEth(currentprice);
		rentTerms = await loadRentTerms(egg, _offerType);		
	});
</script>

<div class="card" style="width: 18rem;">
	<EggBox {eggImg} {element} {owner} tokenId={egg.tokenId}  />
	<OfferBox {owner} {price} {rentTerms} {buy} {isForSale} {rent} {_offerType} />
</div>

<style>
	.card {
		border:solid 2px black;
	}

</style>