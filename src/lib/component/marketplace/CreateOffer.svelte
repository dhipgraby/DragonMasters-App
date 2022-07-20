<script>
	import { TokenType, OfferType, saleTerms } from '$lib/contracts/Marketplace';	
    import { getWei } from '$lib/helpers/utils';
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let contract;
	export let tokenId;
	let price = 1;

     async function sellOffer() {
        let priceInWei = await getWei(price)
        saleTerms.price = priceInWei     
		let selling = await contract.setOffer(tokenId, OfferType.ForSale, TokenType.Dragon, saleTerms);
        console.log(selling)
        if (selling.blockHash) {
			dispatch('offerCreated', {
				price:price, 
				name:'offerCreated'               
			});
		}
	}
    
</script>

<h3>Create a offer in the marketplace</h3>
<small><b>Token Id {tokenId} </b></small>
<input class="form-control" placeholder="Eth" type="text" bind:value={price} />

<button class="btn btn-success mt-2" on:click={()=> sellOffer()}>Create Offer</button>
