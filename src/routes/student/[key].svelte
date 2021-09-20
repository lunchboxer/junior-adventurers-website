<script>
  import { page } from '$app/stores'
  import { student } from './_data'
  import { goto } from '$app/navigation'

  import Loading from '$lib/Loading.svelte'
  import Error from '$lib/Error.svelte'
  import { notifications } from '$lib/notifications'
  import { onMount } from 'svelte'
  import EditIcon from '$lib/icons/EditIcon.svelte'
  import EditStudentForm from './_EditStudentForm.svelte'

  const { key } = $page.params

  let showForm = false
  let errors = ''
  let loading = true
  let showConfirm = false
  let deleteButton
  let deleting = false

  $: console.log(key)

  $: console.log($student)

  onMount(async () => {
    try {
      await student.get(key)
      if (!$student) errors = 'No student found with that id'
    } catch (error) {
      notifications.add('Unable to get student from database.')
      errors = error
      loading = false
    } finally {
      loading = false
    }
  })

  const confirmDelete = () => {
    showConfirm = true
  }

  const reallyDelete = async () => {
    deleting = true
    deleteButton.disabled = true
    try {
      await student.delete(key)
      notifications.add('Successfully deleted student.')
      goto('/students')
    } catch (error) {
      notifications.add('A problem occured when deleting student.')
      errors = error
    } finally {
      deleting = false
      if (deleteButton) deleteButton.disabled = false
    }
    showConfirm = false
  }

  const dontDelete = () => {
    showConfirm = false
  }
</script>

<h2>Student File</h2>

{#if loading}
  <Loading what="student" />
{:else if $student}
  {#if showForm}
    <EditStudentForm bind:showForm />
  {:else}
    <h3>{$student.name}</h3>
    <p>Birthdate: {$student.birthdate || 'unknown'}</p>
    <p>Languages: {$student.languages || 'unknown'}</p>

    <button
      on:click={() => {
        showForm = true
      }}
    >
      <EditIcon fill="var(--color-on-primary)" />Edit
    </button>
    {#if showConfirm}
      <button on:click={dontDelete}>Keep</button>
      <button
        on:click={reallyDelete}
        class:is-loading={deleting}
        bind:this={deleteButton}>Really Delete {$student.name}</button
      >
    {:else}
      <button on:click={confirmDelete}>&times; Delete</button>
    {/if}
  {/if}
{/if}

<Error {errors} />
