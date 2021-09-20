<script>
  export let url = ''
  export let label = ''
  export let segment
  export let action = ''

  const runAction = event => {
    event.preventDefault()
    action()
  }
</script>

{#if action}
  <a href="." on:click={runAction}>{label}</a>
{:else}
  <a href={url} class:active={segment === url}>{label}</a>
{/if}

<style>
  a {
    text-align: right;
    float: right;
    clear: right;
    width: auto;
    text-decoration: none;
    font-size: 2.8rem;
    font-weight: 200;
    color: white;
    padding: 0.8rem 2rem;
    margin: 0.5rem 0;
    background: rgba(0, 0, 0, 0.6);
  }
  a:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  a.active {
    background-color: var(--primary-color);
    color: var(--color-on-primary);
  }
  @media (min-width: 400px) {
    a {
      font-size: 3rem;
    }
  }
</style>
