<svelte:options accessors={true} />

<script>
	import { afterUpdate, onMount } from 'svelte';
	import { dragonApproval } from '$lib/storage/dragon';
	import { eggApproval } from '$lib/storage/eggs';
	import { OfferType, TokenType } from '$lib/contracts/LoanBook';
	import BasicModal from '../BasicModal.svelte';
	import { approvalRequired } from '$lib/interfaces/ICave';
	import OfferBox from './OfferBox.svelte';

	export let tokenProps;
	export let contract;
	export let openModal;
	export let doPromise = false;
	export let _tokenType;

	let promise;
	$: singleApproval =
		_tokenType == TokenType.Egg ? $approvalRequired.egg : $approvalRequired.dragon;
	$: CheckApproval = _tokenType == TokenType.Egg ? $eggApproval : $dragonApproval;

	let modaComponent;

	onMount(() => {
		openModal = function () {
			modaComponent.openModal();
		};
	});

	afterUpdate(() => {
		console.log('updating',doPromise)
		if (CheckApproval == true) singleApproval = false;
		tokenProps.isApproved = singleApproval == false ? true : false;
		// if (doPromise == true && singleApproval == true) promise = later(500);
	});

	async function later(delay) {
		return new Promise(async (resolve) =>
			setTimeout(resolve, delay, await contract.getApproved(tokenProps.tokenId, _tokenType))
		);
	}

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
		}
	}

	function handleApprove(event) {
		singleApproval = false;
		tokenProps.isApproved = true;
	}

	function handleSetOffer(event) {
		updateOffer(event.detail.offer);
	}

	function handleModifyOffer(event) {
		updateOffer(event.detail.offer);
	}

	function handleRemoveOffer(event) {
		let offerType = event.detail.offerType;
		if (offerType == OfferType.ForSale) {
			tokenProps.offer.sellOffer = null;
		} else {
			tokenProps.offer.rentOffer = null;
		}
	}

	function updateOffer(offer) {
		if (offer.offerType == OfferType.ForSale) {
			tokenProps.offer.sellOffer = offer;
		} else {
			tokenProps.offer.rentOffer = offer;
		}
	}
</script>

<BasicModal bind:this={modaComponent} btnName={false} id={'tokenModal' + tokenProps.tokenId}>
	<OfferBox
		{tokenProps}
		{formHanlders}
		{doPromise}
		{promise}
		{_tokenType}
		{contract}
		{handleApprove}
	/>
</BasicModal>
