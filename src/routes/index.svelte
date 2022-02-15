<script>

import {contracts} from '$lib/storage/contracts';
import { onMount } from 'svelte';

let _contracts
	onMount( async ()=>{
		_contracts = await contracts();		
		console.log(_contracts)
	})

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

</style>
