<script>
	import MainContainer from '$lib/component/containers/MainContainer.svelte';
	import MarketGrid from '$lib/component/marketplace/MarketGrid.svelte';
	import { onMount } from 'svelte';
	import { LoadInterface, contracts } from '$lib/interfaces/IMarket';
	import {
		dragonsForSale,
		eggsForSale,
		dragonsForRent,
		eggsForRent
	} from '$lib/storage/marketplace';
	import { TokenType, OfferType } from '$lib/contracts/LoanBook';	
	import { get_unique_tokenid } from '$lib/helpers/utils';
	import TokenButtons from '$lib/component/marketplace/TokenButtons.svelte';
	import OfferTypeBtn from '$lib/component/marketplace/OfferTypeBtn.svelte';
	import { orderByOffer } from '$lib/helpers/utils';

	//Per page is not correctly Integrated. Only pages are been produced
	let show = TokenType.Egg;
	let _offerType = OfferType.ForRent;
	let perpage = 10;
	perpage--;

	$: contractsData = $contracts;
	//SELL OFFERS
	$: dragons_for_sale = $dragonsForSale;
	$: eggs_for_sale = $eggsForSale;
	//RENT OFFERS
	$: dragons_for_rent = $dragonsForRent;
	$: eggs_for_rent = $eggsForRent;
	let allOffers; 

	const allAssets = () => {
		const offers =  {
			dragons: get_unique_tokenid(dragons_for_sale, dragons_for_rent),
			eggs: get_unique_tokenid(eggs_for_sale, eggs_for_rent)			
		};
		return {
			dragons: orderByOffer(offers.dragons,OfferType.ForSale),
			eggs: orderByOffer(offers.eggs,OfferType.ForSale),
		}
	};

	const changeToken = (_tokenType) => {		
		show = _tokenType;
	};

	const setOfferType = (newType) => {
		_offerType = newType
		console.log(_offerType);
	}

	onMount(async () => {
		await LoadInterface(0, perpage);				
		allOffers = allAssets()		
		console.log(allOffers);
	});
</script>

<svelte:head>
	<title>Marketplace - Dragon Masters</title>
</svelte:head>

<MainContainer>
	<h1>Marketplace</h1>

	<OfferTypeBtn {setOfferType} {_offerType} />

	<TokenButtons {changeToken} />

	{#if _offerType == OfferType.ForSale}
		{#if show == TokenType.Egg}
			<MarketGrid
				{_offerType}
				assets={eggs_for_sale}
				contract={contractsData}
				loadPage={LoadInterface}
				{perpage}
				_tokenType={TokenType.Egg}
			/>
		{/if}
		{#if show == TokenType.Dragon}
			<MarketGrid
				{_offerType}
				assets={dragons_for_sale}
				contract={contractsData}
				loadPage={LoadInterface}
				{perpage}
				_tokenType={TokenType.Dragon}
			/>
		{/if}
	{/if}

	{#if _offerType == OfferType.ForRent}
		{#if show == TokenType.Egg}
			<MarketGrid
				{_offerType}
				assets={eggs_for_rent}
				contract={contractsData}
				loadPage={LoadInterface}
				{perpage}
				_tokenType={TokenType.Egg}
			/>
		{/if}
		{#if show == TokenType.Dragon}
			<MarketGrid
				{_offerType}
				assets={dragons_for_rent}
				contract={contractsData}
				loadPage={LoadInterface}
				{perpage}
				_tokenType={TokenType.Dragon}
			/>
		{/if}
	{/if}
	{#if _offerType == OfferType.ForSaleOrRent}

	{#if show == TokenType.Egg}
		<MarketGrid
			{_offerType}
			assets={allOffers.eggs}
			contract={contractsData}
			loadPage={LoadInterface}
			{perpage}
			_tokenType={TokenType.Egg}
		/>
	{/if}
	{#if show == TokenType.Dragon}
		<MarketGrid
			{_offerType}
			assets={allOffers.dragons}
			contract={contractsData}
			loadPage={LoadInterface}
			{perpage}
			_tokenType={TokenType.Dragon}
		/>
	{/if}
{/if}
</MainContainer>

<style>

	h1 {
		margin-bottom: 25px;
	}

</style>
