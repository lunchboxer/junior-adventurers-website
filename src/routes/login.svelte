<script>
  import { goto } from '@sapper/app'
  import { onMount } from 'svelte'
  import { auth } from '../data/auth'
  import { notifications } from '../components/notifications'
  import Input from '../components/Input.svelte'
  import { loading } from '../components/Loading.svelte'
  import Error from '../components/Error.svelte'

  let userCount
  let signupForm
  let loginForm
  let formLoading = false
  let signupSubmit
  let loginSubmit
  let name = ''
  let password = ''
  let email = ''
  let errors = ''
  let show = false

  loading.set('user count')

  onMount(async () => {
    if ($auth.token) {
      notifications.add({ text: 'Already logged in.', type: 'danger' })
      history.back()
      return
    }
    try {
      userCount = await auth.getUserCount()
    } catch (error) {
      errors = error
    } finally {
      loading.set(false)
      show = true
    }
  })

  const login = async () => {
    const isValid = loginForm.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger',
      })
      return
    }
    formLoading = true
    loginSubmit.diabled = true
    try {
      await auth.login(email, password)
      notifications.add({
        text: `Logged in wih email: ${email}`,
        type: 'success',
      })
      goto('/')
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Something went wrong. Could not log in.',
        type: 'danger',
      })
      loginSubmit.disabled = false
    } finally {
      formLoading = false
    }
  }
  const signup = async () => {
    const isValid = signupForm.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger',
      })
      return
    }
    formLoading = true
    signupSubmit.diabled = true
    try {
      await auth.createUser(name, email, password)
      notifications.add({
        text: `Created a new user account with email: ${email}`,
        type: 'success',
      })
      goto('/')
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Something went wrong. Could not create new account.',
        type: 'danger',
      })
      signupSubmit.disabled = false
    } finally {
      formLoading = false
    }
  }

  const reset = () => {
    password = ''
    email = ''
    history.back()
  }
</script>

<svelte:head>
  <title>Log in</title>
</svelte:head>

<div class="hider" class:show>
  {#if userCount === 0}
    <h2>Sign up</h2>
    <p>It looks like you are the first user in the system</p>

    <Error {errors} />

    <form
      bind:this={signupForm}
      novalidate
      on:submit|preventDefault={signup}
      on:reset|preventDefault={reset}
    >
      <Input label="Name" bind:value={name} autocomplete="name" />
      <Input
        label="Email"
        type="email"
        bind:value={email}
        required
        autocomplete="username"
      />

      <Input
        label="Password"
        type="password"
        bind:value={password}
        required
        autocomplete="new-password"
      />
      <button type="reset" class="button-outline">Cancel</button>
      <button
        type="submit"
        bind:this={signupSubmit}
        class:is-loading={formLoading}>Sign up</button
      >
    </form>
  {:else if userCount > 0}
    <h2>Log in</h2>

    <Error {errors} />

    <form
      bind:this={loginForm}
      novalidate
      on:submit|preventDefault={login}
      on:reset|preventDefault={reset}
    >
      <Input
        label="Email"
        bind:value={email}
        required
        disabled={formLoading}
        autocomplete="username"
      />
      <Input
        label="Password"
        bind:value={password}
        required
        disabled={formLoading}
        type="password"
        autocomplete="current-password"
      />
      <button type="reset" class="button-outline">Cancel</button>
      <button
        type="submit"
        bind:this={loginSubmit}
        class:is-loading={formLoading}>Log in</button
      >
    </form>
  {/if}
</div>
