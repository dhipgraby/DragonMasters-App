<script>
	import ProgressBar from "./ProgressBar.svelte";

	export let dragon;
	export let checkBtn = true;
	export let fullEnergy = null

	$: isAdult = dragon.ageGroup != '1' ? 'Adult Dragon' : 'Hatchling';

</script>

<div class="card" style="width: 18rem;">
	<div class="card-header">
		<img src="/images/dragon.png" alt="dragon" />
	</div>
	<div class="card-body">
		<h5 class="card-title">Dragon : #{dragon.tokenId}</h5>
		<hr />
		<p class="card-text">
			{#if dragon.energy}
				<b>Energy</b>
				<br />
				<ProgressBar	
				emitEvent={true}
				eventName={'isReady'}
				on:isReady={fullEnergy}										
				timer={dragon.energy}
				bgClass={'bg-warning'}
				 />
			{/if}

			<b>DNA:</b>
			{dragon.dna.genes}
			<br />
			<b>Maturity: {isAdult}</b>
			<br />
			<b>Generation:</b>
			{dragon.dna.generation}
			<br />
			<b>MumId:</b>
			{dragon.mumId}
			<br />
			<b>DadId:</b>
			{dragon.dadId}
		</p>
		<br />
		{#if checkBtn}
			<a href="/dragon/{dragon.tokenId}"
				><button class="btn btn-dark">Checkout <i class="fas fa-arrow-circle-right" /></button></a
			>
		{/if}
	</div>
</div>

<style>
	.btn-dark {
		width: 100%;
	}

	img {
		widows: 100%;
	}

	p {
		font-size: 12px;
		font-weight: 600;
		color: #999999;
		margin: 0px;
	}
	.card {
		border-radius: 20px;
		margin: 10px;
		transition: 0.5s;
	}

	.card:hover {
		box-shadow: 0px 10px 20px -8px;
	}

	.card-title {
		color: #737373;
		font-size: 20px;
		font-weight: 600;
	}

	.card-header {
		border-radius: 20px 20px 0px 0px;
		cursor: pointer;
		padding: 20px 0px;
		background-color: #f2fffb;
		background: linear-gradient(20deg, #f2fffb, #b3b3b3);
	}

	.card-body {
		text-align: center;
	}

	.card-text {
		text-align: left;
	}
</style>
