<svelte:options accessors={true} />

<script>
	import { afterUpdate, onMount } from 'svelte';
	import { dragonApproval }  from "$lib/storage/dragon";	
	import BasicModal from '../BasicModal.svelte';	
	import ModifyOffer from '../marketplace/modifyOffer.svelte';
	import CreateOffer from '../marketplace/CreateOffer.svelte';
	import AppoveToken from '../marketplace/appoveToken.svelte';

	export let dragonProps;
	export let contract;
	export let singleApproval;
	export let openModal;
	export let doPromise = false;
	
	let modaComponent;
	let modalData;
	let promise;
	$: CheckApproval = $dragonApproval

	onMount(() => {
		openModal = function () {
			modaComponent.openModal();
		};
		updateDragonData(dragonProps);
	});

	afterUpdate(() => {			
		if(CheckApproval == true) singleApproval = false	
		dragonProps.isApproved = singleApproval == false ? true : false;
		if (doPromise == true && singleApproval == true) promise = later(500);
		updateDragonData(dragonProps);
	});

	const createOffer = async () => {
		// setForSale(dragonProps.tokenId, price);
		console.log('setting offer');
	};

	const updateDragonData = async (dragonProps) => {
		if (dragonProps.isApproved == true) {
			if (dragonProps.offer) {
				modalData = modal_modify_offer;
			} else {
				modalData = modal_Sell;
			}
		} else {
			modalData = modal_approve;
		}
	};

	//MODAL DATA DEPEDING ON APPROVE AND OFFER

	let modal_Sell = {
		submit_name: 'submit',
		title: 'Create marketplace offer',
		callback: createOffer
	};

	let modal_modify_offer = {
		submit_name: 'submit',
		title: 'Change offer for token id: <b>' + dragonProps.tokenId + '</b>',
		callback: false
	};

	let modal_approve = {
		submit_name: 'Approve',
		title: 'Marketplace Approval',
		callback: false
	};

	async function later(delay) {
		return new Promise(async (resolve) =>
			setTimeout(resolve, delay, await contract.getApproved(dragonProps.tokenId))
		);
	}

	function handleApprove(event) {
		singleApproval = false	
		dragonProps.isApproved = true
		updateDragonData(dragonProps);
	}
</script>


<BasicModal	
	bind:this={modaComponent}
	{...modalData}
	btnName={false}
	id={'dragonModal' + dragonProps.tokenId}
>
	<!-- CHECK APPROVE FOR ALL -->
	{#if dragonProps.isApproved == true}
		{#if dragonProps.offer}
			<ModifyOffer tokenId={dragonProps.tokenId} />
		{:else}
			<CreateOffer tokenId={dragonProps.tokenId} />
		{/if}
		<!-- IF IS NOT APPROVE FOR ALL CHECK SINGLE APPROVE  -->
	{:else if doPromise == true}
		{#await promise}
			<p>...waiting</p>
		{:then approval}
			<!-- ADDRESS IS APPROVE -->
			{#if approval == true}
				{#if dragonProps.offer}
					<ModifyOffer tokenId={dragonProps.tokenId} />
				{:else}
					<CreateOffer tokenId={dragonProps.tokenId} />
				{/if}
			{:else}
				<!-- ADDRESS HAVE TO APPROVE -->		 
				<AppoveToken on:approved={handleApprove} tokenId={dragonProps.tokenId} {contract} />
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{/if}
</BasicModal>
