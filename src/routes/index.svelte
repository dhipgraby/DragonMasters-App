<script>

	import ContractUI from '$lib/component/ContractUI.svelte'
	import { EggContract } from '$lib/contracts/methods';
	import { onMount } from 'svelte';

	let contract;

	onMount(async () => {
		contract = await new EggContract();
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>


<ContractUI {contract} />
