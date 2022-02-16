<script>
    import { fly } from "svelte/transition";
    import { dismissAlert } from "$lib/storage/alerts";
    
    export let alertType = "info";
    export let content = "This is a empty alert, just close it...";
    export let id
    export let alert_number = 0;
    export let show = true;
  
    let marginBottom = (alert_number - 1) * 70 + 10;
    let timeOut = 40500;
    let _dismiss;
  
    if (marginBottom < 80) marginBottom = 10;
  
    function dismiss() {
      dismissAlert(id);
    }
  
    clearAlert();
  
    function clearAlert() {
      if (id == 0) return;
      _dismiss = setTimeout(() => {
        dismissAlert(id);
      }, timeOut);
    }
  
    function stopClear() {
      if (id == 0) return;
      clearTimeout(_dismiss);
    }
    
  </script>
  
  {#if show}
    <div
      id="alertDiv"
      style="bottom:{marginBottom}px;"
      on:mouseenter={stopClear}
      on:mouseleave={clearAlert}
    >
      <div
        class="alert alert-{alertType} alert-dismissible fade show"
        role="alert"
        transition:fly={{ y: 100, duration: 700 }}
      >
        <p>index: {alert_number} {@html content}</p>
  
        <button type="button" class="btn-close" on:click={() => dismiss()} />
      </div>
    </div>
  {/if}
  
  <style>
    #alertDiv {
      z-index: 100;
      position: fixed;
      width: fit-content;
      margin: auto;
      width: 100%;
    }

    .alert {
        width: fit-content;
        max-width: 70%;
        margin: auto;
    }


  
    p {
      margin: 0;
    }
  </style>
  