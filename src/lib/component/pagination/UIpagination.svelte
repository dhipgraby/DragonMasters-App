<script>
	export let startIndex;
	export let endIndex;
	export let changeIndex;
</script>

<div class="row">
	<div class="col">
		<input
			type="number"
			on:change={() => changeIndex('start',startIndex)}
			bind:value={startIndex}
			class="form-control"
			placeholder="startIndex"
		/>
	</div>

	<div class="col">
		<input
			type="number"
			on:change={() => changeIndex('end',endIndex)}
			bind:value={endIndex}
			class="form-control"
			placeholder="endIndex"
		/>
	</div>
</div>
