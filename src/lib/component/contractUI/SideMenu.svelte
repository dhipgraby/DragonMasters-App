<script>
	import '/static/css/adminSidebar.css';
	import { onMount } from 'svelte';

	export let changeView;
	export let activeItem

	onMount(() => {
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl);
		});
	});
</script>

<main class="d-flex flex-nowrap">
	<div class="flex-shrink-0 p-3 bg-white sidebar">
		<a
			href="/"
			class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
		>
			<span
				data-bs-toggle="tooltip"
				data-bs-trigger="hover"
				data-bs-placement="right"
				title="Dashboard"
				class="fs-5 fw-semibold uiTitle"
				><i class="fas fa-window-restore" />
				UI
				<small>Call Functions and query contract data</small>
			</span>
		</a>
		<ul class="list-unstyled ps-0">
			<li class="mb-1">
				<button
					data-bs-html="true"
					data-bs-toggle="tooltip"
					data-bs-trigger="hover"
					data-bs-placement="right"
					title="Egg Contract"
					on:click={() => changeView(1)}
					class="btn align-items-center rounded sidebarBtn {(activeItem == 1) ? "activeItem": "" }"
				>
					<i class="fas fa-egg" /> Egg Token
				</button>
			</li>
			<li class="mb-1">
				<button
					data-bs-toggle="tooltip"
					data-bs-trigger="hover"
					data-bs-placement="right"
					title="Dragon Contract"
					on:click={() => changeView(2)}
					class="btn align-items-center rounded sidebarBtn {(activeItem == 2) ? "activeItem": "" }"
				>
					<i class="fas fa-dragon" /> Dragon Token
				</button>
			</li>

			<li class="border-top my-3" />
			<li class="mb-1">
				<button
					data-bs-toggle="collapse"
					data-bs-target="#marketplace-collapse"
					aria-expanded="false"
					class="btn btn-toggle d-inline-flex align-items-center rounded border-0 marketDropdown"
				>
					<i class="fas fa-store me-2" /> Marketplace
				</button>
				<div class="collapse" id="marketplace-collapse">
					<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
						<li>
							<button
								data-bs-toggle="tooltip"
								data-bs-trigger="hover"
								data-bs-placement="right"
								title="Marketplace"
								on:click={() => changeView(3)}
								class="btn align-items-center rounded sidebarBtn {(activeItem == 3) ? "activeItem": "" }"
							>
								<i class="fas fa-book" aria-hidden="true" /> Offers
							</button>
						</li>
						<li>
							<button
								data-bs-toggle="tooltip"
								data-bs-trigger="hover"
								data-bs-placement="right"
								title="LoanBook"
								on:click={() => changeView(4)}
								class="btn align-items-center rounded sidebarBtn {(activeItem == 4) ? "activeItem": "" }"
							>
								<i class="fas fa-paste" /> LoanBook
							</button>
						</li>
						<li>
							<button
								data-bs-toggle="tooltip"
								data-bs-trigger="hover"
								data-bs-placement="right"
								title="Approvals"
								on:click={() => changeView(5)}
								class="btn align-items-center rounded sidebarBtn {(activeItem == 5) ? "activeItem": "" }"
							>
								<i class="fas fa-check-circle" /> Approvals
							</button>
						</li>
					</ul>
				</div>
			</li>

			<li class="border-top mb-1 mt-4 pt-3 exitBtn">
				<button
					on:click={() => (location.href = '/')}
					class="btn align-items-center rounded sidebarBtn"
				>
					<i class="fas fa-sign-out-alt" /> Exit
				</button>
			</li>
		</ul>
	</div>
</main>

<style>
	button {
		font-weight: 600;
	}
</style>
