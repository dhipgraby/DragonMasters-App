<script>
	export let selectSubSpecie;
</script>

<!-- LITHOSPHERE -->
<div class="row">
	<div class="col p-1">
		<div class="eggContainer pointer" id="mum" on:click={() => selectSubSpecie(0)}>
			<h1 class="egg earth"><i class="fas fa-egg" /></h1>
			<h3>Earth</h3>
		</div>
	</div>
	<div class="col p-1">
		<div class="eggContainer pointer" id="mum" on:click={() => selectSubSpecie(1)}>
			<h1 class="egg fire"><i class="fas fa-egg" /></h1>
			<h3>Fire</h3>
		</div>
	</div>
</div>
<!-- HIDROSPHERE -->
<div class="row">
	<div class="col p-1">
		<div class="eggContainer pointer" id="mum" on:click={() => selectSubSpecie(2)}>
			<h1 class="egg air"><i class="fas fa-egg" /></h1>
			<h3>Air</h3>
		</div>
	</div>
	<div class="col p-1">
		<div class="eggContainer pointer" id="mum" on:click={() => selectSubSpecie(3)}>
			<h1 class="egg water"><i class="fas fa-egg" /></h1>
			<h3>Water</h3>
		</div>
	</div>
</div>

<style>
	
.row {
	justify-content: center;
}

.col {
	text-align: -webkit-center;
	margin: 10px 5px;
	max-width: 220px;
	align-self: center;
}

.eggContainer:hover {
	box-shadow: 0px 10px 20px -8px;
}
</style>