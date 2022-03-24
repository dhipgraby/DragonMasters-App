<script>
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import ProgressBar from './ProgressBar.svelte';

	const dispatch = createEventDispatcher();

	export let dragon;
	export let contract;	

	let dna;
	let maturity;
	let energy;
	let raiseDisabled = true;
	
	$: isAdult = dragon.ageGroup != '1' ? 'Adult Dragon' : 'Hatchling';
	
	onMount(async () => {
		dna = await contract.getDna(dragon.dnaId);
		checkEnergy();
		checkMaturity();
	});

	async function checkEnergy() {
		energy = await contract.checkEnergy(dragon.tokenId);
	}

	async function checkMaturity() {
		maturity = await contract.checkMaturity(dragon.tokenId);
		if (maturity == 0) raiseDisabled = false;
	}

	function readyToRaise() {
		raiseDisabled = false;
	}

	async function raiseDragon() {
		await contract.raiseHatchling(dragon.tokenId);
		dispatch('update');		
	}
</script>

<div class="row">
	<div class="col-4">
		<div class="dragonBg">
			<img src="/images/dragon.png" alt="dragon" />
		</div>
		<p>
			<b>MumId:</b>
			{dragon.mumId}
			<br />
			<b>DadId:</b>
			{dragon.dadId}
		</p>
	</div>

	<div class="col-8 px-4">		
		<h1>Dragon #{dragon.tokenId}</h1>
		<hr />

		<p class="card-text">
			{#if dna}
				<b>DNA:</b>
				{dna.genes}
				<br />
				<b>Generation:</b>
				{dna.generation}
			{/if}
			<br />
			<b>Maturity:</b>
			{isAdult}
		</p>

		<hr />

		{#if dragon.ageGroup == '1'}
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
		{/if}
	</div>
</div>

<style>
	.btn-yellow {
		font-size: 14px;
		padding: 4px 20px !important;
		margin-bottom: 10px;
	}

	i {
		margin-right: 5px;
	}

	.row {
		margin-top: 40px;
	}

	.dragonBg {
		margin-bottom: 25px;
		text-align: center;
		border-radius: 20px;
		background-color: #f2fffb;
		background: linear-gradient(20deg, #f2fffb, #b3b3b3);
	}

	img {
		widows: 100%;
	}

	.card-text {
		text-align: left;
	}
</style>
