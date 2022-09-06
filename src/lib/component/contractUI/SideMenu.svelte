<script>
	import '/static/css/adminSidebar.css';
	export let changeView;
</script>

<main class="d-flex flex-nowrap">
	<div class="flex-shrink-0 p-3 bg-white sidebar">
		<a
			href="/"
			class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
		>
			<svg class="bi pe-none me-2" width="30" height="24"><use xlink:href="#bootstrap" /></svg>
			<span class="fs-5 fw-semibold">Contracts UI</span>
		</a>
		<ul class="list-unstyled ps-0">
			<li class="mb-1">
				<button on:click={() => changeView(1)} class="btn align-items-center rounded">
					Egg Token
				</button>
			</li>
			<li class="mb-1">
				<button on:click={() => changeView(2)} class="btn align-items-center rounded">
					Dragon Token
				</button>
			</li>
			<li class="mb-1">
				<button on:click={() => changeView(3)} class="btn align-items-center rounded">
					Marketplace
				</button>
			</li>
			<li class="mb-1">
				<button on:click={() => changeView(4)} class="btn align-items-center rounded">
					LoanBook
				</button>
			</li>
			<li class="border-top my-3" />
			<li class="mb-1">
				<button
					class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
					data-bs-toggle="collapse"
					data-bs-target="#marketplace-collapse"
					aria-expanded="false"
				>
					Marketplace
				</button>
				<div class="collapse" id="marketplace-collapse">
					<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
						<li>
							<button on:click={() => changeView(4)} class="btn align-items-center rounded">
								Approval
							</button>
						</li>
						<li>
							<button on:click={() => changeView(4)} class="btn align-items-center rounded">
								Approval
							</button>
						</li>

						<!-- <li>
							<a href="/ui" class="link-dark d-inline-flex text-decoration-none rounded">Sign out</a
							>
						</li> -->
					</ul>
				</div>
			</li>
		</ul>
	</div>
</main>
