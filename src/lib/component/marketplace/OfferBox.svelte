<script>
	import OfferForm from './OfferForm.svelte';
	import ApproveToken from './ApproveToken.svelte';

	export let tokenProps;
	export let formHanlders;
	export let doPromise;
	export let promise;
	export let _tokenType;
	export let contract;
	export let handleApprove;
	export let _offerType;
</script>

<!-- CHECK APPROVE FOR ALL -->
{#if tokenProps.isApproved == true}
	<OfferForm
		{_offerType}
		offer={tokenProps.offer}
		tokenId={tokenProps.tokenId}
		{formHanlders}
		{contract}
		{_tokenType}
	/>
	<!-- IF IS NOT APPROVE FOR ALL CHECK SINGLE APPROVE  -->
{:else if doPromise == true}
	{#await promise}
		<p>Loading market...</p>
	{:then approval}
		<!-- ADDRESS IS APPROVE -->
		{#if approval == true}
			<OfferForm
				{_offerType}
				offer={tokenProps.offer}
				tokenId={tokenProps.tokenId}
				{formHanlders}
				{contract}
			/>
		{:else}
			<ApproveToken
				on:approved={handleApprove}
				tokenId={tokenProps.tokenId}
				{contract}
				{_tokenType}
			/>
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
{/if}
