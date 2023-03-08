<script>
	import '/static/css/Assets/SingleAsset.css';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { OfferType } from '$lib/contracts/Marketplace';
	import SingleEggLeft from './SingleEggLeft.svelte';
	import SingleAssetRight from '../marketplace/SingleAssetRight.svelte';
	import { afterUpdate } from 'svelte';
	import { TokenType } from '$lib/contracts/MarketApproval';
	import EggActions from './EggActions.svelte';

	export let egg;
	export let contract;
	export let account;

	let doPromise = true;
	let _offerType = OfferType.ForSale;
	let eggImg;
	let element;

	afterUpdate(async () => {
		element = iconElement(egg.subSpecies);
		eggImg = await getImg(egg.subSpecies).egg;
	});
</script>

<!-- SELL OFFER -->
<div class="row pt-5">
	<SingleEggLeft {egg} img={eggImg} {element} />
	<!-- RIGHT-SIDE ->ATTRIBUTES AND RAISE -->
	<div class="col-6 rightsideBox">
		<SingleAssetRight
			asset={egg}            
			{contract}
			{account}
            {_offerType}
			_tokenType={TokenType.Egg}
			{doPromise}			
		/>
		{#if egg.isOwner}
			<EggActions {egg} {contract} />
		{/if}
	</div>
</div>

<style>
	.rightsideBox {
		padding: 10px 10px;
	}
</style>
