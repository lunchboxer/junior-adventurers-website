<script>
  import { students } from './_data'

  export let errors
  let loading = false
  let show = false
  const defaultValue = 100
  let credit = defaultValue
  let setSubmit

  const toggleShow = () => {
    show = !show
    credit = defaultValue
  }

  const setCredits = async () => {
    if (credit === undefined) return
    loading = true
    setSubmit.disabled = true
    try {
      const studentIds = $students.map(student => student.key)
      await students.resetCredits(studentIds, credit)
      toggleShow()
    } catch (error) {
      errors = error
    } finally {
      loading = false
      setSubmit.disabled = false
    }
  }
</script>

{#if !show}
  <button on:click={toggleShow}> Reset credits </button>
{:else}
  <input type="number" bind:value={credit} min="0" />
  <button on:click={setCredits} bind:this={setSubmit} class:is-loading={loading}
    >Set credits</button
  >
  <button on:click={toggleShow} class="button-outline">Cancel</button>
{/if}

<style>
  input {
    width: 8rem;
  }
</style>
