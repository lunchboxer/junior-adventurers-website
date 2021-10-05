<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        status,
        error,
      },
    }
  }
</script>

<script>
  import { dev } from '$app/env'

  export let status
  export let error
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h2>Error {status}</h2>

{#if error?.message}
  <p>{error.message}</p>
{/if}

{#if dev && error?.stack}
  <pre>{error.stack}</pre>
{/if}

<style>
  p {
    margin: 1em auto;
  }
</style>
