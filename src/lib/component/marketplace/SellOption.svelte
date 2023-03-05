<svelte:options accessors={true} />

<script>
	import { onMount } from 'svelte';
	import { dragonApproval } from '$lib/storage/dragon';
	import { eggApproval } from '$lib/storage/eggs';
	import { OfferType, TokenType } from '$lib/contracts/LoanBook';
	import BasicModal from '../BasicModal.svelte';
	import { approvalRequired } from '$lib/interfaces/ICave';
	import OfferBox from './OfferBox.svelte';

	export let tokenProps;
	export let contract;
	export let openModal;
	export let _tokenType;
	export let doPromise = false;
	export let btnName = false;
	export let _offerType = OfferType.NoOffer;

	let promise;
	let modaComponent;

	$: singleApproval =
		_tokenType == TokenType.Egg ? $approvalRequired.egg : $approvalRequired.dragon;
	$: CheckApproval = _tokenType == TokenType.Egg ? $eggApproval : $dragonApproval;

	onMount(() => {		
		openModal = function () {
			console.log(_offerType);
			modaComponent.openModal();
			console.log('opening modal', doPromise);
			setApprovals();
		};
	});

	async function setApprovals() {
		if (CheckApproval == true) singleApproval = false;
		tokenProps.isApproved = singleApproval == false ? true : false;
		if (doPromise == true && singleApproval == true) promise = later(500);
		tokenProps.isApproved = singleApproval == false ? true : false;
	}

	async function later(delay) {
		return new Promise(async (resolve) => {
			setTimeout(resolve, delay, await getAprroval());
		});
	}

	async function getAprroval() {
		if (tokenProps.isApproved === true) {
			console.log('already approved');
			return true;
		}
		console.log('checking ');
		let approval = await contract.getApproved(tokenProps.tokenId, _tokenType);
		console.log(approval);
		tokenProps.isApproved = approval;
		return approval;
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

<BasicModal bind:this={modaComponent} {btnName} id={'tokenModal' + tokenProps.tokenId}>
	<OfferBox
		{_offerType}
		{tokenProps}
		{formHanlders}
		{doPromise}
		{promise}
		{_tokenType}
		{contract}
		{handleApprove}
	/>
</BasicModal>
