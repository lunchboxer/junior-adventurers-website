<script>
  import { students } from './_data'
  import Loading from '$lib/Loading.svelte'
  import Error from '$lib/Error.svelte'
  import { onMount } from 'svelte'
  import { notifications } from '$lib/notifications'

  let errors
  let loading = true

  onMount(async () => {
    try {
      await students.get()
    } catch (error) {
      errors = error
      notifications.add({
        text: "Couldn't get students from server.",
        type: 'danger',
      })
    } finally {
      loading = false
    }
  })
</script>

{#if loading}
  <Loading what="student list" />
{:else}
  <Error {errors} />

  {#if $students}
    {#if $students.length === 0}
      <p>There are no students in the database yet.</p>
    {:else}
      <p>There are {$students.length} students in the database.</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthdate</th>
            <th>Languages</th>
          </tr>
        </thead>
        <tbody>
          {#each $students as student}
            <tr>
              <td><a href="/student/{student.key}">{student.name}</a></td>
              <td>{student.birthdate}</td>
              <td>{student.languages || ''}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  {/if}
{/if}
