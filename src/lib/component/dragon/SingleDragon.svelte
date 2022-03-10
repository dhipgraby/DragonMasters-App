<script>
	import { onMount } from 'svelte';

	export let dragon;
	export let contract;

	let dna;

	onMount(async () => {
		dna = await contract.getDna(dragon.dnaId);
	});

	async function checkEnergy() {
		await contract.checkEnergy(dragon.tokenId);
	}

    async function checkMaturity() {
		await contract.checkMaturity(dragon.tokenId);
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
		</p>

		<hr />
		<div class="group-btn">
			<button class="btn btn-light" on:click={ () => checkEnergy() }><i class="fas fa-bolt"></i> Check Energy</button>

			<button class="btn btn-dark" on:click={ () => checkMaturity() }><i class="fas fa-brain"></i> Check Maturity</button>
		</div>
	</div>
</div>

<style>
	.row {
		margin-top: 40px;
	}

    button {
        margin: 10px;
        letter-spacing: 1px;
        font-weight: 600;
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

	p {
		font-size: 22px;
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
