<script>
	import BreedBox from '$lib/component/breed/BreedBox.svelte';
</script>

<svelte:head>
	<title>Breed Dragons</title>
</svelte:head>

<div class="container mt-5">
	<div class="inner">
		<div class="mb-5">
		<h1 class="egg"><i class="fas fa-egg" /></h1>
		<h1>Breeding</h1>
		<p>
			You can breed only Adults dragons with same Species
		</p>
	</div>
		<BreedBox />
	</div>
</div>

<style>
	.inner {
		text-align: center;
	}

	.egg {
		color: #ff6d6d;
	}
</style>
