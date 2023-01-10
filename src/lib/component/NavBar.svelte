<script>
	import { getBalance, shortAddr } from '$lib/helpers/utils';
	import { afterUpdate } from 'svelte';

	export let uriPath;
	export let user_address;

	let userBalance = 0;

	afterUpdate(async ()=>{
		userBalance = (user_address) ? await getBalance(user_address) : 0;		
	})

	function copyAddress() {
		navigator.clipboard.writeText(user_address);
	}
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<div class="container-fluid">
		<a class="navbar-brand" href="/"><i class="fas fa-dragon" /></a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link {uriPath == '/ui' ? 'active' : ''}" aria-current="page" href="/ui"
						>UI</a
					>
				</li>
				<li class="nav-item">
					<a class="nav-link {uriPath == '/marketplace' ? 'active' : ''}" href="/marketplace"
						>Marketplace</a
					>
				</li>
				<li class="nav-item">
					<a class="nav-link {uriPath == '/cave' ? 'active' : ''}" href="/cave">Cave</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {uriPath == '/breed' ? 'active' : ''}" href="/breed">Breed</a>
				</li>
				{#if user_address}
					<li class="nav-item" title="Click to Copy">
						<span class="nav-link" href="/#" on:click={copyAddress}>{shortAddr(user_address)}</span>
					</li>
					<li class="nav-item" title="Click to Copy">
						<span class="nav-link balance" href="/#">Wei: {userBalance}</span>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>

<style>

	.balance{
		color: white;
		letter-spacing: 1px;
	}

	li span {
		cursor: pointer;
	}

	.nav-link {
		font-weight: 600;
	}

	.navbar-nav {
		width: 100%;
		justify-content: center;
	}
</style>
