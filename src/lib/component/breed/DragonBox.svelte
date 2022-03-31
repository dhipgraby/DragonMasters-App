<script>
	import { setAlert } from '$lib/storage/alerts';

	import { update_current_dragon } from '$lib/storage/dragon';
	import { updateSingle } from '$lib/contracts/DragonToken';
	import { onMount } from 'svelte';
	import DragonCard from '../dragon/DragonCard.svelte';
	import SwitchButton from './SwitchButton.svelte';

	export let dragonProps;
	export let gender;
	export let switchBtn = false;
	export let callback = null;
	export let getEnergy = null;
	export let hide = null;

	$: dragon = dragonProps;

	onMount(async () => {
		if (getEnergy == null && dragon.energy != undefined) return;
		if (dragon.energy <= 0 || dragon.energy > 0) return;
		dragon.energy = parseInt(await getEnergy(dragonProps.tokenId));
		// dragon.energy -= 50;		
		updateSingle(dragon);
	});

	function fullEnergy() {
		dragon.energy = 0;
		updateSingle(dragon);
	}

	const updateEnergy = () => {
		if(dragon.energy < 1) return
		dragon.energy -= 1		
	};

	function chooseDragon() {
		if (dragon.energy <= 0) {
			if (hide != null) {
				hide();
				update_current_dragon(dragon, gender);
			}
		} else {
			setAlert('Dragons need full energy to Breed', 'warning');
		}
	}
</script>

<div
	on:click={() => chooseDragon()}
	id={'dragon' + dragon.tokenId}
	class="col-lg-4 pointer"
	align="left"
>
	<DragonCard {dragon} callback={updateEnergy} checkBtn={false} {fullEnergy} />

	{#if switchBtn}
		<SwitchButton {gender} {callback} />
	{/if}
</div>

<style>
	.col-lg-4 {
		position: relative;
	}
</style>
