<script>
	import { perpage, updatePerpage } from '$lib/storage/pagination';

	$: _perpage = $perpage;
	export let totalAssets;
	export let loadPage;
	export let inferfaceName;

	$: totalPages = Math.ceil(parseInt(totalAssets) / _perpage);
	$: pages = totalPages > 0 ? new Array(totalPages) : [];

	let setPerpage = _perpage;

	const calcPage = (page) => {
		let from;
		let to;
		if (page === 0) {
			from = page * _perpage;
			to = page * _perpage + _perpage;
		} else {
			from = page * _perpage + 1;
			to = page * _perpage + (_perpage + 1);
		}		
		return [from, to];
	};

	const updatePages = () => {
		loadPage(0,setPerpage,inferfaceName)
		updatePerpage(setPerpage)
	}

</script>

<div class="mycontainer">
	<div class="myRow">
		<div>
			<input type="number" bind:value={setPerpage} class="form-control" placeholder="Per page" />
		</div>
		<div>
			<button class="btn btn-primary" on:click={() => updatePages()}>SET</button>
		</div>
	</div>

	<div class="btn-group mt-3 mb-2" role="group">
		{#if pages}
			{#each pages as button, i}
				<button
					on:click={() => loadPage(calcPage(i)[0], calcPage(i)[1], inferfaceName)}
					type="button"
					class="btn btn-light">{i}</button
				>
			{/each}
		{/if}
	</div>
	<br />
	<small>Total Items: {totalAssets}</small>
	<small class="ml"> Per page: {_perpage}</small>
	<small class="ml"> Total pages: {totalPages}</small>
</div>

<style>

	small {
		color: black;
		font-weight: 600;
	}

	.ml {
		margin-left: 15px;
	}

	.mycontainer {
		width: 100%;
		text-align: left;		
	}

	.myRow {
		display: inline-flex;
		width: 100%;
	}

	.btn-primary {
		letter-spacing: 1px;
		font-weight: 500;
		margin-left: 10px;
	}

	.btn {
		border: none !important;
		box-shadow: 0px 1px 5px grey;
	}

	.btn-group .btn:nth-child(1) {
		border-top-left-radius: 30px !important;
		border-bottom-left-radius: 30px !important;
	}

	.btn-group .btn:last-child {
		border-bottom-right-radius: 30px !important;
		border-top-right-radius: 30px !important;
	}

	input {
		max-width: 150px;
	}

	.btn-group {
		margin: auto;
	}

	.btn-group button {
		font-size: 12px;
	}

	.btn-light {
		font-weight: 700;
	}

	.btn-light:hover {
		color: black;
	}
</style>
