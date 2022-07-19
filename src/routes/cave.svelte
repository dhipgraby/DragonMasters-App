<script>
	//COMPONENTS
	import EggGrid from '$lib/component/egg/EggGrid.svelte';
	import DragonGrid from '$lib/component/dragon/DragonGrid.svelte';
	//STORAGE
	import { userDragons } from '$lib/storage/dragon';
	import { userEggs } from '$lib/storage/eggs';
	import { userOffers } from '$lib/storage/marketplace';
	//CONTRACTS
	import { EggContract } from '$lib/contracts/EggToken';
	import { DragonContract } from '$lib/contracts/DragonToken';
	import { MarketplaceContract, TokenType, OfferType } from '$lib/contracts/Marketplace';
	import { initEventListener } from '$lib/contracts/events';
	import { onMount } from 'svelte';

	let contract = [];
	let singleApproval = false;
	let show = 1;
	let fromId = 1;
	let toId = 10;
	let dragonButtons = [];

	$: offers = $userOffers;
	$: eggs = $userEggs;
	$: dragons = $userDragons;

	onMount(async () => {
		// userDragons.useLocalStorage()

		contract['egg'] = await new EggContract();
		contract['dragon'] = await new DragonContract();
		contract['market'] = await new MarketplaceContract();

		let contractEvents = await contract.egg.contract.EggToken.events;

		let updater = () => {
			contract['egg'].getUserEggs(fromId, toId);
		};

		await initEventListener(contractEvents, updater, 'EggToken');

		LoadInterface(fromId, toId);

		//Checking Approval
		let approveForAll = await contract['market'].isApprovedForAll();
		if (approveForAll == true) {
			singleApproval = false;
		} else {
			singleApproval = true;
		}
	});

	async function LoadInterface(from, to, forceReload = false) {
		fromId = from;
		toId = to;
		console.log('loading interface from:' + fromId + ' to: ' + toId);
		if (eggs.length > 0 && forceReload == false) return;
		await contract['egg'].getUserEggs(fromId, toId);
		console.log('Eggs loaded');
		if (dragons.length > 0 && forceReload == false) return;
		await contract['dragon'].getUserDragons(fromId, toId);
		console.log('Dragons loaded');
		if (offers.length > 0 && forceReload == false) return;
		await contract['market'].getOfferedBy(fromId, toId, OfferType.ForSale, TokenType.Dragon);
		await contract['market'].getOfferedBy(fromId, toId, OfferType.ForSale, TokenType.Egg);
		console.log('Offers loaded');
	}
</script>

<svelte:head>
	<title>Cave - Dragon Masters</title>
</svelte:head>

<section>
	<div class="btn-group" role="group">
		<button type="button" on:click={() => (show = 1)} class="btn btn-light"
			><i class="fas fa-egg" /> EGGS
		</button>
		<button type="button" on:click={() => (show = 2)} class="btn btn-light"
			><i class="fas fa-dragon" /> DRAGONS
		</button>
		<button
			type="button"
			on:click={async () => await LoadInterface(fromId, toId, true)}
			class="btn btn-dark"
		>
			<i class="fas fa-redo" />
		</button>
	</div>
	<div class="input-group">
		<span class="input-group-text" id="basic-addon1">FROM</span>
		<input type="number" bind:value={fromId} class="form-control" placeholder="from Id" />

		<span class="input-group-text ms-3" id="basic-addon1">TO</span>
		<input type="number" bind:value={toId} class="form-control" placeholder="to Id" />
		<button
			type="button"
			on:click={async () => await LoadInterface(fromId, toId, true)}
			class="btn btn-dark"
		>
			search
		</button>
	</div>

	{#if show == 1}
		<EggGrid {eggs} contract={contract['egg']} loadPage={LoadInterface} />
	{/if}

	{#if show == 2}
		<DragonGrid {dragons} contract={contract['market']} {singleApproval} pages={dragonButtons} />
	{/if}
</section>

<style>
	.input-group {
		max-width: 500px;
	}

	section {
		padding-top: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.btn-group .btn {
		margin: 8px;
		font-weight: 600;
		letter-spacing: 0.8px;
	}

	.btn-group {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.btn-dark {
		font-size: 12px !important;
	}
</style>
