<script>
    export let addTime;
</script>

  <div class="btn-group" role="group" aria-label="Basic example">
	<button on:click={() => addTime(1)} type="button" class="btn btn-secondary">+ 1 Day</button>
	<button on:click={() => addTime(2)} type="button" class="btn btn-secondary">+ 2 Days</button>
	<button on:click={() => addTime(3)} type="button" class="btn btn-secondary">+ 3 Days</button>
  </div>

  <div class="btn-group" role="group" aria-label="Basic example">
	<button on:click={() => addTime(7)} type="button" class="btn btn-secondary">+ 1 Week</button>
	<button on:click={() => addTime(14)} type="button" class="btn btn-secondary">+ 2 Weeks</button>	
  </div>

  <div class="btn-group" role="group" aria-label="Basic example">
	<button on:click={() => addTime(30)} type="button" class="btn btn-secondary">+ 1 Month</button>		
  </div>

  <div class="btn-group" role="group" aria-label="Basic example">
	<button on:click={() => addTime(365)} type="button" class="btn btn-secondary">+ 1 Year</button>		
  </div>
