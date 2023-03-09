<script>
	import { onMount } from 'svelte';
	import SellOption from './SellOption.svelte';
	import { contracts } from '$lib/interfaces/Core';
	import { TokenType } from '$lib/contracts/MarketApproval';
	import { OfferType } from '$lib/contracts/Marketplace';
	import '/static/css/Assets/CircleMenu.css';

	export let tokenProps;
	export let hovering;
	export let _tokenType;

	$: contract = $contracts;
	let active = false;
	let openModal;
	let modaComponent;
	let doPromise = true;
	let viewUrl = _tokenType === TokenType.Dragon ? 'dragon/' : 'egg/' + tokenProps.tokenId;

	onMount(() => {
		openModal = function () {
			modaComponent.openModal();
		};
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl);
		});
	});

	function formHanlders(event) {
		let eventName = event.detail.name;
		switch (eventName) {
			case 'offerCreated':
				handleSetOffer(event);
				break;
			case 'offerModifyed':
				handleModifyOffer(event);
				break;
			case 'offerRemoved':
				handleRemoveOffer(event);
				break;
			case 'buyed':
				handleBuy();
				break;
			case 'rented':
				handleRent(event);
				break;
		}
	}
	// HANDLE OFFERS OWNER FUNCTION
	function handleSetOffer(event) {
		console.log('offer created', event);
		updateOffer(event.detail.offer);
	}

	function handleModifyOffer(event) {
		updateOffer(event.detail.offer);
	}

	function handleRemoveOffer(event) {
		let offerType = event.detail.offerType;
		if (offerType == OfferType.ForSale) {
			tokenProps.offer.sellOffer = null;
			isForSale = false;
		} else {
			tokenProps.offer.rentOffer = null;
			isForRent = false;
		}
	}

	function updateOffer(offer) {
		if (offer.offerType == OfferType.ForSale) {
			tokenProps.offer.sellOffer = offer;
			tokenProps.price = offer.price;
		} else {
			tokenProps.offer.rentOffer = offer;
			tokenProps.rentTerms = offer.rentTerms;
		}
	}
</script>

<div class="{hovering ? 'show' : 'hide'} maindiv">
	<div
		on:click={() => {
			active = active == true ? false : true;
		}}
		class="menu"
		align="center"
	>
		<i class="fas fa-cog" />
	</div>

	<div class={active == true ? 'd-block' : 'd-hide'}>
		<a href={viewUrl}>
			<div
				class="menu firstItem"
				align="center"
				data-bs-html="true"
				data-bs-toggle="tooltip"
				data-bs-placement="right"
				title="<b>View</b>"
			>
				<i class="far fa-eye" />
			</div>
		</a>

		<div on:click={openModal} class="menu secondItem" align="center">
			<i class="fas fa-dollar-sign" />
		</div>
	</div>
</div>

<SellOption
	bind:this={modaComponent}
	{formHanlders}
	tokenId={tokenProps.tokenId}
	offer={tokenProps.offer}
	contract={contract.market}
	{doPromise}
	{_tokenType}
/>
