<script>
  import { onMount } from 'svelte'
  import { theme } from '../components/themes/ThemeLoader.svelte'

  let systemTheme = 'light'

  onMount(() => {
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)')) systemTheme = 'dark'
  })

  $: actualTheme = $theme || systemTheme
</script>

<h2>Settings</h2>
<p>Change your personal settings for experiencing the site.</p>

<h3>Light/Dark Mode</h3>

<p>
  Your browser or OS preferences are for {systemTheme} colors, but you can override
  this.
</p>
<button on:click={theme.toggle}
  >Switch to {actualTheme === 'dark' ? 'light' : 'dark'} theme</button
>
