<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { Maturity } from '$lib/helpers/utils.js';
	import ProgressBar from './ProgressBar.svelte';

	const dispatch = createEventDispatcher();

	export let contract;
	export let tokenId;
	export let ageGroup;

	let maturity;
	let energy;
	let raiseDisabled = true;

	onMount(async () => {
		await checkEnergy();
		await checkMaturity();
	});

	function readyToRaise() {
		raiseDisabled = false;
	}

	async function raiseDragon() {
		await contract.dragon.raiseMaturity(tokenId);
		dispatch('update');
	}

	async function checkEnergy() {
		if (!tokenId) return;
		energy = await contract.dragon.checkEnergy(tokenId);
	}

	async function checkMaturity() {
		if (!tokenId) return;
		maturity = await contract.dragon.checkMaturity(tokenId);
		if (maturity == 0) raiseDisabled = false;
	}
</script>

<div class="attrDiv">
	<h3><i class="fas fa-fist-raised" /> Actions</h3>
	<hr />
	{#if ageGroup != Maturity.Immortal}
		{#if maturity > 0}
			<p class="c-black"><i class="fas fa-brain" /> Maturity</p>
			<ProgressBar timer={maturity} bgClass={'bg-info'} />
		{/if}

		{#if maturity == 0}
			<b>READY TO RAISE</b>
			<br />
		{/if}
	{/if}

	{#if energy > 0}
		<p class="c-black mt-3"><i class="fas fa-bolt" /> Energy</p>
		<ProgressBar
			emitEvent={true}
			eventName={'isReady'}
			on:isReady={readyToRaise}
			timer={energy}
			bgClass={'bg-warning'}
		/>
	{:else}
		<p class="c-black mt-3"><i class="fas fa-bolt" /> Full Energy</p>
	{/if}
	<button
		on:click={() => {
			raiseDragon();
		}}
		class="btn btn-yellow mt-3"
		disabled={raiseDisabled}
	>
		Raise to Adult
	</button>
	<br />
	<button
		on:click={() => {
			window.location.href = '/breed';
		}}
		class="btn btn-yellow mt-3"
		disabled={raiseDisabled}
	>
		Breed
	</button>
	{#if maturity > 0 || energy > 0}
		<div class="alert alert-primary mt-2" role="alert">
			Need full <b>energy</b> and Maturity time filled before <b>Raise your Dragon or Breed</b>
		</div>
	{/if}
</div>
