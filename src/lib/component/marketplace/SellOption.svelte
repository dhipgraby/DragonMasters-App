<svelte:options accessors={true} />

<script>
	import { onMount } from 'svelte';
	import { dragonApproval } from '$lib/storage/dragon';
	import { eggApproval } from '$lib/storage/eggs';
	import { OfferType, TokenType } from '$lib/contracts/LoanBook';
	import { approvalRequired } from '$lib/interfaces/ICave';
	import OfferBox from './OfferBox.svelte';
	import BasicModal from '../BasicModal.svelte';

	export let offer;
	export let tokenId;
	export let contract;
	export let openModal;
	export let _tokenType;
	export let doPromise = false;
	export let btnName = false;
	export let _offerType = OfferType.NoOffer;
	export let formHanlders;

	console.log(tokenId);
	let promise;
	let modaComponent;

	$: singleApproval =
		_tokenType == TokenType.Egg ? $approvalRequired.egg : $approvalRequired.dragon;
	$: CheckApproval = _tokenType == TokenType.Egg ? $eggApproval : $dragonApproval;

	onMount(() => {
		openModal = function () {
			modaComponent.openModal();
			setApprovals();
		};
	});

	async function setApprovals() {
		if (CheckApproval == true) singleApproval = false;
		offer.isApproved = singleApproval == false ? true : false;
		if (doPromise == true && singleApproval == true) promise = later(500);
		offer.isApproved = singleApproval == false ? true : false;
	}

	async function later(delay) {
		return new Promise(async (resolve) => {
			setTimeout(resolve, delay, await getAprroval());
		});
	}

	async function getAprroval() {
		if (offer.isApproved === true) {
			console.log('already approved');
			return true;
		}
		let approval = await contract.getApproved(tokenId, _tokenType);
		console.log(approval);
		offer.isApproved = approval;
		return approval;
	}

	function handleApprove(event) {
		singleApproval = false;
		offer.isApproved = true;
	}
</script>

<BasicModal bind:this={modaComponent} {btnName} id={'tokenModal' + tokenId}>
	<OfferBox
		{offer}
		{_offerType}
		{_tokenType}
		{contract}
		{doPromise}
		{promise}
		{formHanlders}
		{handleApprove}
	/>
</BasicModal>
