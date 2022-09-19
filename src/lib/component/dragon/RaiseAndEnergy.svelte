<script>
	import { onMount } from 'svelte';
	import ProgressBar from './ProgressBar.svelte';
	import { Maturity } from '$lib/helpers/utils.js';

    export let contract
    export let tokenId    
    export let ageGroup

	let maturity;
	let energy;
	let raiseDisabled = true;

	onMount(async () => {		
		checkEnergy();
		checkMaturity();
	});

	function readyToRaise() {
		raiseDisabled = false;
	}

	async function raiseDragon() {
		await contract.raiseMaturity(tokenId);
		dispatch('update');
	}

	async function checkEnergy() {
		energy = await contract.checkEnergy(tokenId);
	}

	async function checkMaturity() {
		maturity = await contract.checkMaturity(tokenId);
		if (maturity == 0) raiseDisabled = false;
	}
</script>

<div class="attrDiv mt-3">
	{#if ageGroup != Maturity.Immortal}
		{#if maturity > 0}
			<p class="c-black"><i class="fas fa-brain" /> Maturity</p>
			<ProgressBar timer={maturity} bgClass={'bg-info'} />
		{/if}

		{#if maturity == 0}
			<b>READY TO RAISE</b>
			<br />
		{/if}
		<button
			on:click={() => {
				raiseDragon();
			}}
			emitEvent={true}
			eventName={'isReady'}
			on:isReady={readyToRaise}
			class="btn btn-yellow mt-3"
			disabled={raiseDisabled}>Raise to Adult</button
		>
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
</div>
