<script>
	import '/static/css/Assets/SingleAsset.css';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { Maturity } from '$lib/helpers/utils.js';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import OfferBtn from '$lib/component/marketplace/OfferBtn.svelte';
	import OfferTerms from '$lib/component/marketplace/OfferTerms.svelte';
	import { OfferType } from '$lib/contracts/Marketplace';
	import { loadRentTerms } from '$lib/helpers/utils.js';
	import DragonAttributes from './DragonAttributes.svelte';
	import RaiseAndEnergy from './RaiseAndEnergy.svelte';
	import About from './About.svelte';
	import { getEth } from '$lib/helpers/utils.js';
	import { TokenType } from '$lib/contracts/MarketApproval';
	import SellOption from '../marketplace/SellOption.svelte';

	const dispatch = createEventDispatcher();

	export let dragon;
	export let account;
	export let contract;
	export let isOwner = false;
	export let isForSale;
	export let isForRent;

	let dna;
	let price;
	let rentPrice;
	let rentTerms;
	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);
	let openModal;
	let modaComponent;
	let doPromise = true;

	$: maturity = Object.keys(Maturity)[dragon.ageGroup];

	onMount(async () => {
		openModal = function () {			
			modaComponent.openModal();
		};

		dna = await contract.dragon.getDna(dragon.dnaId);
		await setPrices();
	});

	async function setPrices() {
		if (isForSale === true) {
			let currentprice = dragon.sellOffer != undefined ? dragon.sellOffer.sellPrice : 0;
			price = await getEth(currentprice);
		}
		if (isForRent === true) {
			let currentprice = dragon.rentOffer != undefined ? dragon.rentOffer.rent.price : 0;
			rentPrice = await getEth(currentprice);
			rentTerms = await loadRentTerms(dragon, OfferType.ForRent);
		}
	}

	const buyToken = async () => {
		await contract['market'].buy(dragon.tokenId, TokenType.Dragon, dragon.sellOffer.sellPrice);
	};

	const rentToken = async () => {
		await contract['market'].rent(
			dragon.tokenId,
			TokenType.Dragon,
			dragon.rentOffer.rent.price,
			dragon.rentOffer.rent.deposit
		);
	};
</script>

<div class="row pt-5">
	<div class="col-6 leftsideBox">
		<!-- IMG -->
		<div class="dragonBg">
			<img src={img} alt="dragon" />
			<div class="pabsolute bottom10 right10">{@html element}</div>
		</div>
		<About {dragon} {dna} {maturity} />

		<div class="attrDiv">
			<h3>Attributes</h3>
			<hr />
			<DragonAttributes attributes={dragon.attributes} />
		</div>
	</div>
	<!-- RIGHT-SIDE ->ATTRIBUTES AND RAISE -->
	<div class="col-6 rightsideBox">
	
			{#if isOwner}
				<div class="attrDiv">					
					<SellOption
						bind:this={modaComponent}
						noModal={true}
						tokenProps={dragon}
						contract={contract.market}
						{doPromise}
						_tokenType={TokenType.Dragon}
					/>
				</div>
			{/if}

		{#if isForSale}
			<div class="attrDiv">
				<div class="d-flex">
					<h3>For Sale</h3>
					{#if isOwner}
						<div class="divBtn">
							<button class="btn btn-light"><i class="fas fa-edit" /> Edit</button>
						</div>
					{/if}
				</div>
				<hr />
				<div>
					<h3>
						Price:
						{price} <i class="fab fa-ethereum" />
					</h3>
				</div>
				{#if !isOwner}
					<OfferBtn
						classicBtn={true}
						_offerType={OfferType.ForSale}
						buy={() => buyToken()}
						rent={() => rentToken()}
						{dragon}
						{account}
						displayOwner={true}
					/>
				{/if}
			</div>
		{/if}
		{#if isForRent}
			<div class="attrDiv">
				<div class="d-flex">
					<h3>Rent Offer</h3>
					{#if isOwner}
						<div class="divBtn">
							<button class="btn btn-light"><i class="fas fa-edit" /> Edit</button>
						</div>
					{/if}
				</div>
				<hr />
				<OfferTerms _offerType={OfferType.ForRent} {rentTerms} {isForSale} salePrice={rentPrice} />
				{#if !isOwner}
					<OfferBtn
						classicBtn={true}
						_offerType={OfferType.ForRent}
						buy={() => buyToken()}
						rent={() => rentToken()}
						{dragon}
						{account}
						displayOwner={true}
					/>
				{/if}
			</div>
		{/if}
		{#if isOwner}
			<!-- LOAD ACTIONS -->
			<RaiseAndEnergy {contract} tokenId={dragon.tokenId} ageGroup={dragon.ageGroup} />
		{/if}
	</div>
</div>

<style>
	h3 {
		margin: 0px;
		white-space: nowrap;
	}

	.divBtn {
		width: 100%;
		text-align: right;
	}

	.divBtn button {
		width: fit-content;
		font-size: 16px;
		margin-top: -5px;
	}

	hr {
		margin-top: 10px;
	}

	.btn-light:hover {
		background-color: rgb(187, 187, 187);
		border-radius: 8px;
	}

	.leftsideBox,
	.rightsideBox {
		padding: 10px 10px;
	}
</style>
