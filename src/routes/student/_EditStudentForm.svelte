<script>
  import { onMount } from 'svelte'
  import { student } from './_data'
  import { notifications } from '$lib/notifications'
  import Input from '$lib/Input.svelte'
  import Error from '$lib/Error.svelte'

  let name
  let birthdate
  let languages
  let form
  let editSubmit
  let loading = false
  let errors = ''
  export let showForm

  onMount(() => {
    name = $student.name
    birthdate = $student.birthdate
    languages = $student.languages
  })

  const updateStudent = async () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger',
      })
      return
    }
    editSubmit.disabled = true
    loading = true
    try {
      await student.patch({ key: $student.key, languages, birthdate, name })
      notifications.add({ text: 'Successfully updated student record.' })
      showForm = false
    } catch (error) {
      notifications.add({
        text: 'Something went wrong when updating student record.',
        type: 'danger',
      })
      errors = error
    } finally {
      if (editSubmit) editSubmit.disabled = false
      loading = false
    }
  }

  const reset = () => {
    loading = false
    errors = ''
    showForm = false
  }
</script>

<h3>Edit Student</h3>

<Error {errors} />

<form
  novalidate
  bind:this={form}
  on:submit|preventDefault={updateStudent}
  on:reset|preventDefault={reset}
>
  <Input label="Name" bind:value={name} />
  <Input label="Birtdate" type="date" bind:value={birthdate} />
  <Input label="Languages" bind:value={languages} />

  <div class="buttons">
    <input type="reset" class="button button-outline" value="Cancel" />
    <button type="submit" class:is-loading={loading} bind:this={editSubmit}>
      Save changes
    </button>
  </div>
</form>
