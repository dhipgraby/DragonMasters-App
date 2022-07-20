<script>
    import ModifyOffer from '../marketplace/modifyOffer.svelte';
	import CreateOffer from '../marketplace/CreateOffer.svelte';
    
    export let contract
    export let offer
    export let tokenId
    export let handleSetOffer
</script>

{#if offer}
	<ModifyOffer {offer} {tokenId} />
{:else}
	<CreateOffer on:offerCreated={handleSetOffer} {tokenId} {contract} />
{/if}
