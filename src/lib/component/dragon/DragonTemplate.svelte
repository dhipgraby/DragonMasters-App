<script>
	import '/static/css/Assets/SingleAsset.css';
	import { onMount } from 'svelte';
	import { Maturity } from '$lib/helpers/utils.js';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { OfferType } from '$lib/contracts/Marketplace';
	import SingleDragonLeft from './SingleDragonLeft.svelte';
	import SingleDragonRight from './SingleDragonRight.svelte';

	export let dragon;
	export let contract;
	export let account;

	let dna;
	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);
	let doPromise = true;
	let _offerType = OfferType.ForSale;

	$: maturity = Object.keys(Maturity)[dragon.ageGroup];

	onMount(async () => {
		dna = await contract.dragon.getDna(dragon.dnaId);
	});
</script>

<!-- SELL OFFER -->
<div class="row pt-5">
	<SingleDragonLeft {img} {element} {dragon} {dna} {maturity} />
	<!-- RIGHT-SIDE ->ATTRIBUTES AND RAISE -->
	<div class="col-6 rightsideBox">
		<SingleDragonRight {dragon} {contract} {_offerType} {doPromise} {account} />
	</div>
</div>

<style>
	.rightsideBox {
		padding: 10px 10px;
	}
</style>
