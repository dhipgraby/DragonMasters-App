<script>
	import { speciesColor } from '$lib/helpers/utils';
	import { fly } from 'svelte/transition';
	export let newEggs;
</script>

{#each newEggs as egg}
	<div class="row">
		<div class="col-sm-4 p-1">
			<div class="eggContainer pointer">
				<h1 class="egg"><i class="fas fa-egg {speciesColor(egg.species)}" /></h1>
				<h3>NEW EGG!</h3>
				<p class="mt-3">
					<b>Egg ID : <a href="/egg/{egg.eggId}">#{egg.eggId}</a></b>
					<br />
					<b>MumId : {egg.mumId}</b>
					<br />
					<b>DadId : {egg.dadId}</b>
				</p>
				<a href="/egg/{egg.eggId}" class="btn btn-dark mt-3">Check it out!</a>
			</div>
		</div>
	</div>
{:else}
	<div class="heartContainer">
		<h1><i class="fas fa-heart-broken" /></h1>
	</div>
	<div class="alert alert-info fade show" role="alert" transition:fly={{ y: 100, duration: 700 }}>
		<p>No eggs from Breeding.<br /> Let your dragons recover energy and try again later.</p>
	</div>
{/each}

<style>
	.row {
		max-width: 800px;
		margin: auto;
	}

	.heartContainer {
		font-size: 50px;
		width: fit-content;
		margin: auto;
		margin-top: 50px;
	}

	.heartContainer h1 {
		font-size: 70px;
	}

	.alert {
		text-align: center;
		width: fit-content;
		margin: auto;
		margin-top: 20px;
	}
	a {
		width: 100%;
	}

	.col-sm-4 {
		align-self: center;
		margin: auto;
		margin-top: 50px;
	}

	.eggContainer {
		max-width: 250px;
		border: solid 1px black;
		border-radius: 10px;
		background: #ffffff;
		margin: auto;
		padding: 20px;
		vertical-align: middle;
	}

	.eggContainer h1,
	h3,
	p {
		color: black;
	}

	.eggContainer h3 {
		color: #a1a1a1;
	}

	.fa-egg {
		text-shadow: 0px 2px 8px #747474;
	}
</style>
