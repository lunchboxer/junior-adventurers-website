<script>
 import { theme } from '$components/themes/ThemeLoader.svelte'

 const systemTheme = matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'
 const actualTheme = $theme || systemTheme
</script>

<h2>Settings</h2>
<p>Change your personal settings for experiencing the site.</p>

<h3>Light/Dark Mode</h3>

<p>Your browser or OS preferences are for {systemTheme} colors, but you can override this.</p>
<button on:click={theme.toggle}>Switch to {actualTheme === 'dark' ? 'light' : 'dark'} theme</button>
