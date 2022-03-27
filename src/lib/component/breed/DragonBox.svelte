<script>
import { setAlert } from '$lib/storage/alerts';

	import { update_current_dragon } from '$lib/storage/dragon';
	import { onMount } from 'svelte';
	import DragonCard from '../dragon/DragonCard.svelte';
	import SwitchButton from './SwitchButton.svelte';

	export let dragonProps;
	export let gender;
	export let switchBtn = false;
	export let callback = null;
	export let getEnergy;
	export let hide = null;

	onMount(async () => {
		dragonProps.energy = await getEnergy(dragonProps.tokenId);
	});

	$: energy = dragonProps.energy

	function fullEnergy(){
		dragonProps.energy = 0
	}

	function chooseDragon() {
		if (energy <= 0) {
			if (hide != null) {
				hide();
				update_current_dragon(dragonProps, gender);
			}
		} else {
			setAlert('Dragons need full energy to Breed','warning')
		}
	}
</script>

<div
	on:click={() => chooseDragon()}
	id={'dragon' + dragonProps.tokenId}
	class="col-lg-4 pointer"
	align="left"
>
	<DragonCard dragon={dragonProps} checkBtn={false} {fullEnergy} />

	{#if switchBtn}
		<SwitchButton {gender} {callback} />
	{/if}
</div>

<style>
	.col-lg-4 {
		position: relative;
	}
</style>
