<script>
  import { auth } from '$lib/data/auth'
  import AddStudentForm from './_AddStudentForm.svelte'
  import StudentList from './_StudentList.svelte'

  let showForm = false

  const showAddForm = () => {
    showForm = true
  }
</script>

<svelte:head>
  <title>Students</title>
</svelte:head>

<h2>Students</h2>

{#if $auth && $auth.token}
  {#if showForm}
    <AddStudentForm bind:showForm />
  {:else}
    <button on:click={showAddForm}>+ Add Student</button>
  {/if}
{/if}

<StudentList />
