<script>
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { onMount } from 'svelte';
	import { getEth, loadRentTerms, loadOwner } from '$lib/helpers/utils';
	import { OfferType } from '$lib/contracts/Marketplace';
	import '$lib/css/marketplace/egg.css';
	import OfferBtn from '../../OfferBtn.svelte';
	import EggBox from './EggBox.svelte';
	import OfferTerms from '../../OfferTerms.svelte';

	export let account;
	export let egg;
	export let buy;
	export let rent;
	export let _offerType;
	$: hovering = false;

	const enter = () => {(hovering = true)
	};
	const leave = () => (hovering = false);

	let price;
	let eggImg = getImg(egg.subSpecies).egg;
	let element = iconElement(egg.subSpecies);
	let owner = loadOwner(account, egg.owner);
	let rentTerms;
	let isForSale = egg.sellOffer !== undefined ? true : false;

	onMount(async () => {
		let currentprice = egg.sellOffer != undefined ? egg.sellOffer.sellPrice : 0;
		price = await getEth(currentprice);
		rentTerms = await loadRentTerms(egg, _offerType);
	});
</script>

<div class="card"  on:mouseenter={enter} on:mouseleave={leave}>
	<EggBox {eggImg} {element} {owner} tokenId={egg.tokenId} />

	{#if _offerType == OfferType.ForSale || _offerType == OfferType.ForRent || _offerType == OfferType.ForSaleOrRent}
		<div class="offerContainer">
			<OfferTerms {_offerType} {rentTerms} {isForSale} salePrice={price} />
			<div class="{hovering ? 'showUp' : 'hideDown'} offerDiv">
				<OfferBtn {owner} {price} {rentTerms} {buy} {isForSale} {rent} {_offerType} />
			</div>
		</div>
	{/if}
</div>
