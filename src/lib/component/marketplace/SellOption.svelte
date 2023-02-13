<svelte:options accessors={true} />

<script>
	import { afterUpdate, onMount } from 'svelte';
	import { dragonApproval } from '$lib/storage/dragon';
	import { eggApproval } from '$lib/storage/eggs';
	import { OfferType,TokenType } from '$lib/contracts/LoanBook';
	import BasicModal from '../BasicModal.svelte';	
	import OfferForm from '../dragonMenu/OfferForm.svelte';
	import AppoveToken from '$lib/component/marketplace/AppoveToken.svelte';
	import { approvalRequired } from '$lib/interfaces/ICave';
	
	export let tokenProps;
	export let contract;	
	export let openModal;
	export let doPromise = false;
	export let _tokenType;

	let promise;
	$: singleApproval = (_tokenType == TokenType.Egg) ? $approvalRequired.egg : $approvalRequired.dragon;
	$: CheckApproval = (_tokenType == TokenType.Egg) ? $eggApproval : $dragonApproval;

	let modaComponent;

	onMount(() => {
		openModal = function () {
			modaComponent.openModal();
		};
	});

	afterUpdate(() => {
		if (CheckApproval == true) singleApproval = false;
		tokenProps.isApproved = singleApproval == false ? true : false;
		if (doPromise == true && singleApproval == true) promise = later(500);
	});

	async function later(delay) {
		return new Promise(async (resolve) =>
			setTimeout(resolve, delay, await contract.getApproved(tokenProps.tokenId,_tokenType))
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
	<!-- CHECK APPROVE FOR ALL -->
	{#if tokenProps.isApproved == true}
		<OfferForm offer={tokenProps.offer} tokenId={tokenProps.tokenId} {formHanlders} {contract} {_tokenType} />
		<!-- IF IS NOT APPROVE FOR ALL CHECK SINGLE APPROVE  -->
	{:else if doPromise == true}
		{#await promise}
			<p>...waiting</p>
		{:then approval}
			<!-- ADDRESS IS APPROVE -->
			{#if approval == true}
				<OfferForm
					offer={tokenProps.offer}
					tokenId={tokenProps.tokenId}
					{formHanlders}
					{contract}
				/>
			{:else}
				<AppoveToken on:approved={handleApprove} tokenId={tokenProps.tokenId} {contract} {_tokenType} />
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{/if}
</BasicModal>
