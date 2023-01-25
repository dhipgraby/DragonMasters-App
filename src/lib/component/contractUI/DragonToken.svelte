<script>
	import { onMount } from 'svelte';
	import Pagination from '$lib/component/pagination/UIpagination.svelte';
	import { setAlert } from '$lib/storage/alerts';
	import { DragonContract } from '$lib/contracts/DragonToken';
	import { initEventListener } from '$lib/contracts/events';

	let contract;
	let relatedA;
	let relatedB;

	let OwnerAddress;
	let startIndex = 0;
	let endIndex = 9;
	let singleId;
	let skillId;
	let tokenIds = '';
	let tokenIdsA = '';
	let tokenIdsB = '';

	onMount(async () => {
		contract = await new DragonContract();
		let contractEvents = await contract.contract?.DragonToken.events;

		const updater = (event) => {
			const newEggs = [];
			const returnValues = event.returnValues;
			if (returnValues.eggIds.length > 0) {
				const eggIds = event.returnValues.eggIds;
				const provenance = event.returnValues.provenance;
				if (eggIds[0] !== undefined) {
					newEggs.push(getNewEgg(eggIds[0], provenance[0]));
					setAlert('One new egg laid! Id: ' + eggIds[0], 'success');
				}
				if (eggIds[1] !== undefined) {
					newEggs.push(getNewEgg(eggIds[1], provenance[1]));
					setAlert('A second egg laid! Id: ' + eggIds[1], 'success');
				}
			} else {
				setAlert('Unlucky, no eggs laid!', 'success');
			}
			console.log(newEggs);
		};

		await initEventListener(contractEvents, updater, 'DragonToken');
		await getEvents();
	});

	async function getEvents() {
		const events = await contract.contract.DragonToken.getPastEvents('EggsLaid', {
			fromBlock: 0,
			toBlock: 'latest'
		});
		console.log(events);
	}

	function getNewEgg(eggId, provenance) {
		return {
			eggId: eggId,
			dadId: provenance.dadId,
			generation: provenance.generation,
			mumId: provenance.mumId,
			species: provenance.species
		};
	}

	function changeIndex(indexType, value) {
		switch (indexType) {
			case 'start':
				startIndex = value;
				break;
			case 'end':
				endIndex = value;
				break;
		}
	}

	async function getDragonIds() {
		contract.getDragonIds(OwnerAddress, startIndex, endIndex, true);
	}

	async function getDragon() {
		contract.getDragon(singleId, true);
	}

	async function checkEnergy() {
		contract.checkEnergy(singleId, true);
	}

	async function checkMaturity() {
		contract.checkMaturity(singleId, true);
	}

	async function getRelationship() {
		contract.getRelationship(relatedA, relatedB, true);
	}

	async function getSkills() {
		contract.getSkills(singleId, true);
	}

	async function getSkillLevel() {
		contract.getSkillLevel(singleId, skillId, true);
	}

	async function getSkillsWithLevels() {
		contract.getSkillsWithLevels(singleId, true);
	}

	async function raiseMaturity() {
		contract.raiseMaturity(tokenIds, true);
	}

	async function breed() {
		if (tokenIdsA.length == 0 && tokenIdsB.length == 0)
			setAlert('Specify at least one pair of dragons for breeding', 'warning');

		let mateA_Ids = [];
		if (tokenIdsA.length > 0) {
			mateA_Ids = tokenIdsA.split(',').map(Number);
		}
		let mateB_Ids = [];
		if (tokenIdsB.length > 0) {
			mateB_Ids = tokenIdsB.split(',').map(Number);
		}
		if (tokenIdsA.length != tokenIdsB.length)
			setAlert('Specify breeding pairs, ie. equal number of mate As & Bs', 'warning');
		else {
			contract.breed(tokenIdsA, tokenIdsB, true);
		}
	}

	async function pause() {
		contract.pause(true);
	}

	async function unpause() {
		contract.unpause(true);
	}
</script>

<h1>DragonToken</h1>

<p class="bold">Contract Status: UNPAUSED</p>
<button class="btn btn-dark text-light bold mb-3 mt-3" on:click={() => pause()}>Pause</button>
<button class="btn btn-dark text-light bold mb-3 mt-3" on:click={() => unpause()}>Unpause</button>
<button class="btn btn-info text-light bold mb-3 mt-3" on:click={() => contract.totalSupply()}
	>Total Supply</button
>

<div class="row">
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid" align="left">
			<h2>Get Dragon Ids</h2>
			<p class="bold">Of owner</p>
			<div class="mb-3">
				<input
					type="text"
					bind:value={OwnerAddress}
					class="form-control mb-3"
					placeholder="address"
				/>
			</div>
			<p class="bold">Paging: start & end indexes</p>
			<div class="mb-3">
				<Pagination {startIndex} {endIndex} {changeIndex} />
			</div>
			<button class="btn btn-dark" on:click={() => getDragonIds()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Get Dragon</h2>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={singleId} class="form-control" placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => getDragon()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Get Skills</h2>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={singleId} class="form-control" placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => getSkills()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Get Skill Level</h2>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={singleId} class="form-control" placeholder="0" />
			</div>
			<p class="bold">Skill Id (0->7)</p>
			<div class="mb-3">
				<input type="text" bind:value={skillId} class="form-control" placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => getSkillLevel()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Get Skills with their levels</h2>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={singleId} class="form-control" placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => getSkillsWithLevels()}>GET</button>
		</div>
	</div>

	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid" align="left">
			<h2>Check Maturity</h2>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={singleId} class="form-control" placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => checkMaturity()}>CHECK</button>
		</div>

		<div class="grid" align="left">
			<h2>Check Energy</h2>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={singleId} class="form-control" placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => checkEnergy()}>CHECK</button>
		</div>

		<div class="grid" align="left">
			<h2>Get Relationship (A to B)</h2>
			<p class="bold">A: Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={relatedA} class="form-control mb-3" placeholder="0" />
				<p class="bold">B: Token Id</p>
				<input type="text" bind:value={relatedB} class="form-control" placeholder="1" />
			</div>
			<button class="btn btn-dark" on:click={() => getRelationship()}>GET</button>
		</div>
	</div>

	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid" align="left">
			<h2>Raise Maturity</h2>
			<p class="bold">Token Ids</p>
			<div class="mb-3">
				<input type="text" bind:value={tokenIds} class="form-control" placeholder="0, 1, ..." />
			</div>
			<button class="btn btn-dark" on:click={() => raiseMaturity()}>Raise</button>
		</div>

		<div class="grid" align="left">
			<h2>Breed (A with B)</h2>
			<p class="bold">Mate A: Token Ids</p>
			<div class="mb-3">
				<input
					type="text"
					bind:value={tokenIdsA}
					class="form-control mb-3"
					placeholder="0, 1, ..."
				/>
				<p class="bold">Mate B: Token Ids</p>
				<input type="text" bind:value={tokenIdsB} class="form-control" placeholder="3, 5, ..." />
			</div>
			<p class="normal small">
				<i
					>Note: Dragon mates (each pair) must be of the same species, maturity, and not
					closely-related. They must also be adult and have full energy.</i
				>
			</p>
			<button class="btn btn-dark" on:click={() => breed()}>BREED</button>
		</div>
	</div>
</div>
