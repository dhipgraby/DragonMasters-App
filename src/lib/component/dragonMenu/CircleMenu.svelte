<script>
	import { onMount } from 'svelte';
	import SellOption from './SellOption.svelte';
	import '/static/css/Assets/CircleMenu.css'

	export let dragonProps;
	export let contract
	export let singleApproval
	export let hovering;	

	let active = false;
	let openModal;
	let modaComponent;
	let doPromise = false

	onMount(() => {
		openModal = function () {			
			doPromise = true					
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

<SellOption bind:this={modaComponent} {dragonProps} {singleApproval} {contract} {doPromise} />
