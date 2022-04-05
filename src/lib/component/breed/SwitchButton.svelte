<script>
    export let gender
    export let callback
</script>

<div class="maindiv">
    <div on:click={() => callback(gender) } class="menu" align="center">
        <i class="fas fa-retweet" />
    </div> 
</div>

<style>
    .maindiv {
        transition: 0.3s;
    }
</style>
