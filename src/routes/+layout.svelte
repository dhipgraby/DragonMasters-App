<script>

	import Header from '$lib/header/Header.svelte';
	import '../app.css';

	import { beforeUpdate } from 'svelte';
	export let data;

	let uriPath
	
	beforeUpdate(() => {
		uriPath = data.uriparams.pathname
	});
</script>

<Header {uriPath} />

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
