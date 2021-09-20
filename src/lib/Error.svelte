<script>
  export let errors = ''
  const getMessage = errors => {
    if (!errors) return false
    if (Array.isArray(errors)) {
      return errors.map(error => error.message).join('\n')
    } else {
      return !errors.message ? errors : errors.message
    }
  }
</script>

{#if getMessage(errors)}
  <p class="error">
    <span class="error-message"
      ><strong>Error:</strong>&nbsp;{getMessage(errors)}</span
    >
  </p>
{/if}

<style>
  .error {
    color: #ff5555;
  }
  .error strong {
    color: inherit;
  }
</style>
