<script>
	import OfferForm from './OfferForm.svelte';
	import ApproveToken from './ApproveToken.svelte';

	export let offer;
	export let _offerType;
	export let _tokenType;
	export let contract;
	export let doPromise;
	export let promise;		
	export let formHanlders;
	export let handleApprove;
	
</script>

<!-- CHECK APPROVE FOR ALL -->
{#if offer.isApproved == true}
	<OfferForm {_offerType} {offer} tokenId={offer.tokenId} {formHanlders} {contract} {_tokenType} />
	<!-- IF IS NOT APPROVE FOR ALL CHECK SINGLE APPROVE  -->
{:else if doPromise == true}
	{#await promise}
		<p>Loading market...</p>
	{:then approval}
		<!-- ADDRESS IS APPROVE -->
		{#if approval == true}
			<OfferForm {_offerType} {offer} tokenId={offer.tokenId} {formHanlders} {contract} />
		{:else}
			<ApproveToken on:approved={handleApprove} tokenId={offer.tokenId} {contract} {_tokenType} />
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
{/if}
