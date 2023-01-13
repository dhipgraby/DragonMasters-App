<script>
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { onMount } from 'svelte';
	import { getEth, loadRentTerms, loadOwner } from '$lib/helpers/utils';
	import '$lib/css/marketplace/egg.css';
	import OfferBox from '../../OfferBox.svelte';

	export let account;
	export let egg;
	export let buy;
	export let rent;
	export let _offerType;

	let price;
	let eggImg;
	let element;
	let owner = egg.owner;
	let rentTerms;

	onMount(async () => {
		let currentprice = egg.sellOffer != undefined ? egg.sellOffer.sellPrice : 0;
		element = iconElement(egg.subSpecies);
		eggImg = await getImg(egg.subSpecies).egg;
		price = await getEth(currentprice);
		owner = loadOwner(account, owner);
		rentTerms = await loadRentTerms(egg, _offerType);
		console.log(rentTerms);
	});
</script>

<div class="card" style="width: 18rem;">
	<div class="card-header">
		<div class="egg-top-container">
			{#if eggImg}
				<img class="eggImg egg-top" alt="egg" src={eggImg} />
				<div class="egg-top-shadow" />
			{/if}

			<div class="pabsolute top10 left10">{@html element}</div>
		</div>
	</div>
	<div class="card-body">
		<div class="row w-100 mb-2">
			<div class="col m-0 ta-c">
				<h5 class="card-title">Egg : #{egg.tokenId}</h5>
			</div>

			<div class="priceDiv">
				<span class="badge bg-black"><b>Owner</b>: {@html owner}</span>
			</div>
		</div>
		<OfferBox {owner} {price} {rentTerms} {buy} {rent} {_offerType} />
	</div>
</div>
