<script>
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { onMount } from 'svelte';
    import { getEth,shortAddr } from '$lib/helpers/utils'
	import '$lib/css/marketplace/egg.css';

	export let account;	
	export let egg;
    export let buy;

    let price
	let eggImg;
	let element;
    let owner = egg.owner     
   
    onMount(async()=>{        
        element = iconElement(egg.subSpecies);
		eggImg = await getImg(egg.subSpecies).egg;
        account = account.toLowerCase()
        owner = owner.toLowerCase()		
        if(account === owner){
            owner = 'You'
        } else {
            owner = shortAddr(owner)
        } 
        price = await getEth(egg.sellOffer.sellPrice)
    })

</script>

<div class="card" style="width: 18rem;">
	<div class="card-header">
	
		<div class="egg-top-container">
			{#if eggImg}
				<img class="eggImg egg-top" alt="egg" src={eggImg} />
				<div class="egg-top-shadow" />
			{/if}

			<div class="pabsolute top10 left10">{@html element}</div>
		</div>
	</div>
	<div class="card-body">
		<div class="row w-100 mb-2">
			<div class="col m-0 ta-l">
				<h5 class="card-title">Egg : #{egg.tokenId}</h5>
			</div>		
		</div>	
        <div class="priceDiv">
            <small><b>Owner</b>: {owner}</small>
            <p><b>Price:</b>
                {price} <i class="fab fa-ethereum"></i>
            </p>
        </div>       
		<button
			class="btn btn-dark"
			on:click={async () => {
				await buy(egg.tokenId,egg.sellOffer.sellPrice);
			}}
		>
			Buy now <i class="fas fa-shopping-cart"></i>
		</button>
	</div>
</div>
