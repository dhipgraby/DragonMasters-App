<script>
	import { onMount } from 'svelte';
	import SellOption from './SellOption.svelte';

	export let hovering;
	export let dragonProps;

	let active = false;
	let openModal;
	let modaComponent;

	onMount(() => {
		console.log(dragonProps);
		openModal = function () {
			modaComponent.openModal();
		};

		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl);
		});
	});
</script>

<div class="{hovering ? 'show' : 'hide'} maindiv">
	<div
		on:click={() => {
			active = active == true ? false : true;
		}}
		class="menu"
		align="center"
	>
		<i class="fas fa-cog" />
	</div>
	<!-- content here -->

	<div class={active == true ? 'd-block' : 'd-hide'}>
		<a href="dragon/{dragonProps.tokenId}">
			<div
				class="menu firstItem"
				align="center"
				data-bs-html="true"
				data-bs-toggle="tooltip"
				data-bs-placement="right"
				title="<b>View</b>"
			>
				<i class="far fa-eye" />
			</div>
		</a>

		<div
			on:click={openModal}
			class="menu secondItem"
			align="center"
			
		>
			<i class="fas fa-dollar-sign" />
		</div>
	</div>
</div>

<SellOption bind:this={modaComponent} {dragonProps} />

<style>
	.menu {
        opacity: 0.8;
		cursor: pointer;
		color: #000000;
		background: #ffffff;
		width: 40px;
		height: 40px;
		padding: 8px;
		border-radius: 50px;
		position: absolute;
		right: 5%;
		top: 15px;
		transition: 0.3s;
		box-shadow: 0px 1px 25px -9px rgba(0, 0, 0, 0.75);
        z-index: 2;
	}

	.menu:hover {
        opacity: 1;
		transform: scale(1.1);
	}
	.firstItem {
		top: 65px;
	}

	.secondItem {
		top: 115px;
	}

	a {
		color: black;
	}

	.maindiv {
		transition: 0.2s;
	}
	.d-block {
		display: block;
	}

	.d-hide {
		display: none;
	}

	.show {
		opacity: 1;
	}

	.hide {
		opacity: 0;
	}
</style>
