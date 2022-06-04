<script>
	export let tokenId;
</script>

<h3>Change offer</h3>
<div class="group-btn">
	<button
		class="btn btn-danger text-light"
		on:click={() => {
			console.log(tokenId);
		}}
		>Remove Offer
	</button>

	<button class="btn btn-warning text-dark">Modify Offer</button>
</div>
