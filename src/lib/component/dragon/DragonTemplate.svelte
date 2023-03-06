<script>
	import '/static/css/Assets/SingleAsset.css';
	import { onMount } from 'svelte';
	import { Maturity } from '$lib/helpers/utils.js';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { OfferType } from '$lib/contracts/Marketplace';
	import SingleDragonLeft from './SingleDragonLeft.svelte';
	import SingleDragonRight from './SingleDragonRight.svelte';
	import RaiseAndEnergy from './RaiseAndEnergy.svelte';

	export let dragon;
	export let contract;	
	export let account;
	export let isOwner;

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
		<SingleDragonRight			
			{dragon}
			{contract}									
			{_offerType}
			{doPromise}
			{account}
			{isOwner}
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
