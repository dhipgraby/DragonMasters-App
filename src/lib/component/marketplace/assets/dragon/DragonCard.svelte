<script>
	import { Maturity, Attributes, loadRentTerms, loadOwner } from '$lib/helpers/utils.js';
	import { getImg, iconElement, iconAttr } from '$lib/storage/dragonImg';
	import { getEth } from '$lib/helpers/utils';
	import { onMount } from 'svelte';
	//CSS
	import '$lib/css/marketplace/marketplace.css';
	import '$lib/css/marketplace/dragon.css';
	import OfferBox from '../../OfferBox.svelte';

	export let dragon;
	export let account;
	export let buy;
	export let rent;
	export let _offerType;

	$: _maturity = Object.keys(Maturity)[dragon.ageGroup];

	let price;
	let owner = dragon.owner;
	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);
	let rentTerms;

	onMount(async () => {
		let currentprice = dragon.sellOffer != undefined ? dragon.sellOffer.sellPrice : 0;
		price = await getEth(currentprice);
		owner = loadOwner(account, owner);
		rentTerms = await loadRentTerms(dragon, _offerType);
		console.log(rentTerms);
	});
</script>

<div class="card" style="width: 18rem;">
	<div class="card-header">
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
		<p class="card-title">Dragon : #{dragon.tokenId}</p>	
		<div class="priceDiv">			
			<span class="badge bg-black"><b>Owner</b>: {@html owner}</span>			
		</div>
		<!--   ATTRIBUTES  -->
		<!-- <div class="row p-0 mt-2">
			{#each dragon.attributes as attribute, i}
				<div class="w-50 ta-l">
					<p>{@html iconAttr(Object.keys(Attributes)[i])}: {attribute}</p>
				</div>
			{/each}
		</div> -->
		<OfferBox {owner} {price} {rentTerms} {buy} {rent} {_offerType} />
	</div>	
</div>
