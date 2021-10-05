<script>
  import { student } from './_data'
  import { students } from '../students/_data'
  import Error from '$lib/Error.svelte'
  let open = false
  export let studentData
  let errors
  let loading = false
  let saveSubmit

  const toggleOpen = () => {
    open = !open
  }

  const updateCredits = async () => {
    loading = true
    saveSubmit.disabled = true
    try {
      await student.patch({ ...studentData })
      toggleOpen()
      students.update(previous =>
        previous.map(student => {
          if (student.key === studentData.key) {
            return { ...student, credit: studentData.credit }
          }
          return student
        }),
      )
    } catch (error) {
      errors = error
    } finally {
      loading = false
      if (saveSubmit) {
        saveSubmit.disabled = false
      }
    }
  }
</script>

<Error {errors} />
{#if open}
  <input type="number" min="0" bind:value={studentData.credit} />
  <button
    bind:this={saveSubmit}
    class:is-loading={loading}
    on:click={updateCredits}>save</button
  >
  <button on:click={toggleOpen} class="button-outline">cancel</button>
{:else}
  <button on:click={toggleOpen}>Change</button>
{/if}

<style>
  input {
    width: 8rem;
  }
</style>
