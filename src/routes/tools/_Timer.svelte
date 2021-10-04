<script>
 import { onMount, onDestroy } from 'svelte';

 let open = false
 let countdown = 0
 let timer = null
 let tempcountdown = 0
 
$: minutes = Math.floor(countdown / 60)
$: seconds = (countdown % 60).toString().padStart(2,0);

 let seconds = 0;
 const showTimer = () => {
    open = true
 }
 const startTimer = () => {
     timer = setInterval(() => {
     if (countdown <= 0) {
         clearInterval(timer)
         timer = null
         return
     }
     countdown -= 1;
     }, 1000);
 }

onDestroy(() => {
     if (timer) {
        clearInterval(timer);
     }
})

</script>

{#if open === false}
  <button on:click={showTimer}>Timer</button>
{:else if timer}
    <div class="timer">
        {minutes}:{seconds}

    </div>
{:else}
    <input bind:value={tempcountdown} type="text"><button>start</button>
{/if}

