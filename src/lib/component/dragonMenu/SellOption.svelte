<svelte:options accessors={true} />

<script>
	import { afterUpdate, onMount } from 'svelte';
	import { dragonApproval } from '$lib/storage/dragon';
	import { OfferType } from '$lib/contracts/LoanBook';
	import BasicModal from '../BasicModal.svelte';	
	import OfferForm from './OfferForm.svelte';
	import AppoveToken from '$lib/component/marketplace/AppoveToken.svelte';
	

	export let dragonProps;
	export let contract;
	export let singleApproval;
	export let openModal;
	export let doPromise = false;
	export let _tokenType;

	let modaComponent;
	let promise;
	$: CheckApproval = $dragonApproval;

	onMount(() => {
		openModal = function () {
			modaComponent.openModal();
		};
	});

	afterUpdate(() => {
		if (CheckApproval == true) singleApproval = false;
		dragonProps.isApproved = singleApproval == false ? true : false;
		if (doPromise == true && singleApproval == true) promise = later(500);
	});

	async function later(delay) {
		return new Promise(async (resolve) =>
			setTimeout(resolve, delay, await contract.getApproved(dragonProps.tokenId,_tokenType))
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
		dragonProps.isApproved = true;
	}

	function handleSetOffer(event) {	
		updateDragonOffer(event.detail.offer);
	}

	function handleModifyOffer(event) {		
		updateDragonOffer(event.detail.offer);
	}

	function handleRemoveOffer(event) {		
		let offerType = event.detail.offerType;
		if (offerType == OfferType.ForSale) {
			dragonProps.offer.sellOffer = null;
		} else {
			dragonProps.offer.rentOffer = null;
		}
	}

	function updateDragonOffer(offer) {		
		if (offer.offerType == OfferType.ForSale) {
			dragonProps.offer.sellOffer = offer;
		} else {
			dragonProps.offer.rentOffer = offer;
		}
	}
</script>

<BasicModal bind:this={modaComponent} btnName={false} id={'dragonModal' + dragonProps.tokenId}>
	<!-- CHECK APPROVE FOR ALL -->
	{#if dragonProps.isApproved == true}
		<OfferForm offer={dragonProps.offer} tokenId={dragonProps.tokenId} {formHanlders} {contract} />
		<!-- IF IS NOT APPROVE FOR ALL CHECK SINGLE APPROVE  -->
	{:else if doPromise == true}
		{#await promise}
			<p>...waiting</p>
		{:then approval}
			<!-- ADDRESS IS APPROVE -->
			{#if approval == true}
				<OfferForm
					offer={dragonProps.offer}
					tokenId={dragonProps.tokenId}
					{formHanlders}
					{contract}
				/>
			{:else}
				<AppoveToken on:approved={handleApprove} tokenId={dragonProps.tokenId} {contract} {_tokenType} />
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{/if}
</BasicModal>
