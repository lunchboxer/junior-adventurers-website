<script>
  import { students } from './_data'
  import { notifications } from '$lib/notifications'
  import Error from '$lib/Error.svelte'
  import Input from '$lib/Input.svelte'

  export let showForm
  let loading
  let errors = ''
  let form
  let addSubmit
  let name = ''
  let birthdate = ''
  let languages = ''

  const reset = () => {
    loading = false
    errors = ''
    showForm = false
  }

  const addStudent = async () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger',
      })
      return
    }
    addSubmit.disabled = true
    loading = true
    try {
      const newStudent = await students.create({ name, birthdate, languages })
      notifications.add(`successfully added new student ${newStudent.name}`)
      reset()
    } catch (error) {
      errors = error
    } finally {
      loading = false
      addSubmit.disabled = false
    }
  }
</script>

<h3>Add a student</h3>

<Error {errors} />

<form
  novalidate
  bind:this={form}
  on:submit|preventDefault={addStudent}
  on:reset|preventDefault={reset}
>
  <Input label="Name" bind:value={name} required />
  <Input label="Birthdate" bind:value={birthdate} type="date" />
  <Input label="Languages" bind:value={languages} />

  <div class="buttons">
    <input class="buton button-outline" type="reset" value="Canel" />
    <button type="submit" class:is-loading={loading} bind:this={addSubmit}>
      Add student
    </button>
  </div>
</form>
