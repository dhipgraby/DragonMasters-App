<script>
	//COMPONENTS
	import EggGrid from '$lib/component/egg/EggGrid.svelte';
	import DragonGrid from '$lib/component/dragon/DragonGrid.svelte';
	//STORAGE
	import { userDragons } from '$lib/storage/dragon';
	import { userEggs } from '$lib/storage/eggs';
	import { lendedEggs, lendedDragons, borrowedEggs, borrowedDragons } from '$lib/storage/loanbook';
	//CONTRACTS
	import { onMount } from 'svelte';
	import { LoadInterface, LoanBookInterface, contracts } from '$lib/interfaces/ICave';
	import MainContainer from '$lib/component/containers/MainContainer.svelte';
	import { perpage } from '$lib/storage/pagination';
	import { urlCurrentParam, ScreenType } from '$lib/helpers/uriHelper';

	let show = 0;

	const changeView = (newParam) => {
		window.history.replaceState({}, '', `?current=${newParam}`);
		show = urlCurrentParam();
	};

	$: contract = $contracts;
	$: eggs = $userEggs;
	$: dragons = $userDragons;
	$: eggLends = $lendedEggs;
	$: eggBorrows = $borrowedEggs;
	$: dragonLends = $lendedDragons;
	$: dragonBorrows = $borrowedDragons;

	onMount(async () => {
		perpage.useLocalStorage();
		await LoanBookInterface(0, $perpage);
		await LoadInterface(0, $perpage);
		console.log(eggLends);
		console.log(eggBorrows);
		console.log(dragonLends);
		console.log(dragonBorrows);
		show = urlCurrentParam();
	});
</script>

<svelte:head>
	<title>Cave - Dragon Masters</title>
</svelte:head>

<div class="btn-group" role="group">
	<button type="button" on:click={() => changeView('eggs')} class="btn darkBtn"
		><i class="fas fa-egg" /> EGGS
	</button>
	<button type="button" on:click={() => changeView('dragons')} class="btn darkBtn"
		><i class="fas fa-dragon" /> DRAGONS
	</button>

	<button type="button" on:click={() => changeView('lends')} class="btn darkBtn"
		><i class="fas fa-hand-holding-usd" /> LENDS
	</button>

	<button type="button" on:click={() => changeView('borrows')} class="btn darkBtn"
		><i class="fas fa-donate" /> BORROWS
	</button>
</div>
{show}
<MainContainer>
	{#if show == 0}
		<h2>Loading...</h2>
	{/if}
	<!-- USER EGSS -->
	{#if show == ScreenType.eggs}
		<EggGrid {eggs} {contract} loadPage={LoadInterface} />
	{/if}
	<!-- USER DRAGONS -->
	{#if show == ScreenType.dragons}
		<DragonGrid {dragons} contract={contract['market']} loadPage={LoadInterface} />
	{/if}
	<!-- LENDED EGGS -->
	{#if show == ScreenType.eggsLend}
		<EggGrid eggs={eggLends} {contract} loadPage={LoanBookInterface} />
	{/if}
	<!-- LENDED DRAGONS -->
	{#if show == ScreenType.dragonsLend}
		<DragonGrid dragons={dragonLends} contract={contract['market']} loadPage={LoanBookInterface} />
	{/if}
	<!-- BORROWED EGGS -->
	{#if show == ScreenType.eggsBorrow}
		<EggGrid eggs={eggBorrows} {contract} loadPage={LoanBookInterface} />
	{/if}
	<!-- BORROWED DRAGONS -->
	{#if show == ScreenType.dragonsBorrow}
		<DragonGrid
			dragons={dragonBorrows}
			contract={contract['market']}
			loadPage={LoanBookInterface}
		/>
	{/if}
	<!-- YOUR LENDS	-->
	{#if show == ScreenType.lends}
		<h1>Your Lends</h1>
		<p>Total Eggs: {eggLends.totalOwned} <span class="spacer"></span>Total Dragons: {dragonLends.totalOwned}</p>
		<div class="row">
			<div class="col loanbox shadow" on:click={() => changeView('eggsLend')}>
				<p>Eggs</p>
			</div>
			<div class="col loanbox shadow" on:click={() => changeView('dragonsLend')}>
				<p>Dragons</p>
			</div>
		</div>
	{/if}
	<!-- YOUR BORROWS	-->
	{#if show == ScreenType.borrows}
		<h1>Your Borrows</h1>
		<p>Total Eggs: {eggBorrows.totalOwned} <span class="spacer"></span>Total Dragons: {dragonBorrows.totalOwned}</p>
		<div class="row">
			<div class="col loanbox shadow" on:click={() => changeView('eggsBorrow')}>
				<p>Eggs</p>
			</div>

			<div class="col loanbox shadow" on:click={() => changeView('dragonsBorrow')}>
				<p>Dragons</p>
			</div>
		</div>
	{/if}
</MainContainer>

<style>
	.row {
		max-width: 500px;
		margin: auto;
	}

	.spacer {
		margin-left: 10px;
		margin-right: 10px;
	}

	.loanbox {
		background-color: white;
		border-radius: 20px;
		padding: 20px;
		width: auto;
		cursor: pointer;
		transition: 0.3s;
		margin: 10px;
		text-align: center;		
	}

	.loanbox p{
		font-weight: 700;
	}

	.loanbox:hover {
		transform: scale(1.1);
	}

	.btn-group {
		margin: auto;
		margin-top: 40px;
	}
</style>
