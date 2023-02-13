<script>
	import { onMount } from 'svelte';
	//COMPONENTS
	import EggGrid from '$lib/component/egg/EggGrid.svelte';
	import DragonGrid from '$lib/component/dragon/DragonGrid.svelte';
	import MainContainer from '$lib/component/containers/MainContainer.svelte';
	import LoanBookCaveBtn from '$lib/component/dragonMenu/LoanBookCaveBtn.svelte';
	//STORAGE
	import { userEggs } from '$lib/storage/eggs';
	import { userDragons } from '$lib/storage/dragon';
	import { perpage } from '$lib/storage/pagination';
	import { lendedEggs, lendedDragons, borrowedEggs, borrowedDragons } from '$lib/storage/loanbook';
	//CONTRACTS
	import { LoadInterface, LoanBookInterface, contracts } from '$lib/interfaces/ICave';
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
		userEggs.useLocalStorage();
		userDragons.useLocalStorage();
		lendedEggs.useLocalStorage();
		borrowedEggs.useLocalStorage();
		lendedDragons.useLocalStorage();
		borrowedDragons.useLocalStorage();

		await LoadInterface(0, $perpage); 
		await LoanBookInterface(0, $perpage); 		
		
		console.log(eggs);
		console.log('dragonBorrows',dragonBorrows);
		console.log('dragonLends',dragonLends);
		console.log(contract);
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

<MainContainer>
	{#if show == 0}
		<h2>Loading...</h2>
	{/if}
	<!-- USER EGSS -->
	{#if show == ScreenType.eggs}
		<EggGrid settingsMenu={true} {eggs} {contract} loadPage={LoadInterface} />
	{/if}
	<!-- USER DRAGONS -->
	{#if show == ScreenType.dragons}
		<DragonGrid settingsMenu={true} {dragons} contract={contract['market']} loadPage={LoadInterface} />
	{/if}
	<!-- LENDED EGGS -->
	{#if show == ScreenType.eggsLend}
		<EggGrid displayOwner={true} eggs={eggLends} {contract} loadPage={LoanBookInterface} />
	{/if}
	<!-- LENDED DRAGONS -->
	{#if show == ScreenType.dragonsLend}
		<DragonGrid
			displayOwner={true}
			dragons={dragonLends}
			contract={contract['market']}
			loadPage={LoanBookInterface}
		/>
	{/if}
	<!-- BORROWED EGGS -->
	{#if show == ScreenType.eggsBorrow}
		<EggGrid displayOwner={true} eggs={eggBorrows} {contract} loadPage={LoanBookInterface} />
	{/if}
	<!-- BORROWED DRAGONS -->
	{#if show == ScreenType.dragonsBorrow}
		<DragonGrid
			dragons={dragonBorrows}
			displayOwner={true}
			contract={contract['market']}
			loadPage={LoanBookInterface}
		/>
	{/if}
	<!-- YOUR LENDS	-->
	{#if show == ScreenType.lends}
		<LoanBookCaveBtn
			title={'Your Lends'}
			totalEggs={eggLends.totalOwned}
			totalDragons={dragonLends.totalOwned}
			{changeView}
			_lendType={ScreenType.lends}
		/>
	{/if}
	<!-- YOUR BORROWS	-->
	{#if show == ScreenType.borrows}
		<LoanBookCaveBtn
			title={'Your Borrows'}
			totalEggs={eggBorrows.totalOwned}
			totalDragons={dragonBorrows.totalOwned}
			{changeView}
			_lendType={ScreenType.borrows}
		/>
	{/if}
</MainContainer>

<style>
	.btn-group {
		margin: auto;
		margin-top: 40px;
	}
</style>
