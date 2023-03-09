<script>
	import DragonCard from '$lib/component/marketplace/assets/dragon/DragonCard.svelte';
	import EggCard from '$lib/component/marketplace/assets/egg/EggCard.svelte';
	import Pagination from '../pagination/Pagination.svelte';
	import { TokenType } from '$lib/contracts/Marketplace';
	import { ColumnSizes } from '$lib/css/grid';

	export let assets;
	export let contract;
	export let loadPage;
	export let _tokenType;
	export let _offerType;

	let inferfaceName = (_tokenType === TokenType.Egg) ? "Egg" : (_tokenType === TokenType.Dragons)  ? "Dragon" : "All"
	$: totalAssets = assets.totalOffers;

	const buyToken = async (tokenId, price) => {
		await contract['market'].buy(tokenId, _tokenType, price);		
	};

	const rentToken = async (tokenId, price, deposit) => {
		console.log(price, deposit);
		await contract['market'].rent(tokenId, _tokenType, price, deposit);		
	};
</script>

<div class="w-100 ta-c">
	<Pagination {totalAssets} {loadPage} {inferfaceName} />
</div>

<div class="row">
	{#if assets.length}
		{#each assets as asset}
			<div class={ColumnSizes}>
				{#if _tokenType == TokenType.Dragon}
					<DragonCard
						account={contract['market'].contract.account}
						dragon={asset}
						buy={() => buyToken(asset.tokenId, asset.sellOffer.sellPrice)}
						rent={() =>
							rentToken(asset.tokenId, asset.rentOffer.rent.price, asset.rentOffer.rent.deposit)}
						{_offerType}
					/>
				{/if}
				{#if _tokenType == TokenType.Egg}
					<EggCard
						account={contract['market'].contract.account}
						egg={asset}
						buy={() => buyToken(asset.tokenId, asset.sellOffer.sellPrice)}
						rent={() =>
							rentToken(asset.tokenId, asset.rentOffer.rent.price, asset.rentOffer.rent.deposit)}
						{_offerType}
					/>
				{/if}
			</div>
		{/each}
	{:else}
		<h2>Not found any offers</h2>
	{/if}
</div>

<style>
	.row div {
		text-align: -webkit-center;
	}
</style>
