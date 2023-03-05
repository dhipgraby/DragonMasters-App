<script>
	import { onMount } from 'svelte';

	export let id;
	export let btnName;

	let modal, overlay;

	onMount(() => {
		modal = document.getElementById(id);
		overlay = document.querySelector('.overlay');
		overlay.addEventListener('click', closeModal);
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
				closeModal();
			}
		});
	});

	function closeModal() {
		modal.classList.add('hidden');
		overlay.classList.add('hidden');
	}

	export const openModal = function () {
		modal.classList.remove('hidden');
		overlay.classList.remove('hidden');
	};
</script>

{#if btnName != false}
	<button on:click={() => openModal(id)} class="btn btn-light">{@html btnName}</button>
{/if}

<div class="modalDiv">
	<div class="modalContainer">
		<div class="modal hidden" {id}>
			<slot />
			<div class="btn-group closeBtn mt-3">
				<button class="btn btn-dark" on:click={() => closeModal()}>Close</button>
			</div>
		</div>
	</div>
</div>

<div class="overlay hidden" />

<style>
	.btn-dark {
		margin: 0px;
	}

	.modal {
		padding: 20px !important;
	}

	.btn-light {
		border-radius: 20px;
		width: 100%;
		margin-top: 10px;
	}

	.closeBtn {
		float: right;
	}

	.modalDiv {
		position: absolute;
		width: 250px;
		left: 30px;
		margin: auto;
		margin-top: 100px;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(4, 24, 54, 0.6);
		z-index: 11;
	}

	.modal {
		display: block;
		height: fit-content;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: fit-content;
		max-width: 800px !important;
		background-color: #fff;
		padding: 30px;
		border-radius: 10px;
		border: solid 2px #5c5c5c;
		z-index: 12;
	}

	.hidden {
		display: none;
	}

	@media (max-width: 765px) {
		.modal {
			max-width: 550px !important;
		}
	}

	@media (max-width: 680px) {
		.modal {
			max-width: 500px !important;
		}
	}

	@media (max-width: 600px) {
		.modal {
			max-width: 420px !important;
		}
	}

	@media (max-width: 580px) {
		.modal {
			max-width: 400px !important;
		}
	}

	@media (max-width: 500px) {
		.modal {
			max-width: 355px !important;
		}
	}

	@media (max-width: 450px) {
		.modal {
			max-width: 300px !important;
		}
	}

	@media (max-width: 380px) {
		.modal {
			max-width: 270px !important;
		}
	}
</style>
