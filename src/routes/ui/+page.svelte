<script>
	import ContractUI from '$lib/component/contractUI/ContractUI.svelte';
	import { onMount } from 'svelte';

	let currentParam;

	onMount(() => {
		const searchParams = new URLSearchParams(window.location.search);
		currentParam = searchParams.get('current');

		switch (currentParam) {
			case 'eggToken':
				currentParam = 1;
				break;
			case 'dragonToken':
				currentParam = 2;
				break;
			case 'offers':
				currentParam = 3;
				break;
			case 'loanbook':
				currentParam = 4;
				break;
			case 'approvals':
				currentParam = 5;
		}
	});
</script>

<svelte:head>
	<title>Contracts - UI</title>

	<link href="/css/contractUI.css" rel="stylesheet" />
</svelte:head>

<ContractUI current={currentParam} />
