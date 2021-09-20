<script context="module">
  import { writable } from 'svelte/store'

  const createThemeStore = () => {
    const chosenTheme =
      typeof localStorage !== 'undefined' && localStorage.getItem('theme')
    let theme = chosenTheme
    if (chosenTheme) {
      const systemTheme = matchMedia('(prefers-color-scheme: dark)')
        ? 'dark'
        : 'light'
      // CSS already sets dark theme based on system setting or browser setting,
      // Check here, to avoid setting the same colors again in a flash of identical styling
      if (systemTheme === chosenTheme) {
        localStorage.removeItem('theme')
        theme = undefined
      }
    }
    const { subscribe, update } = writable(theme)
    return {
      subscribe,
      toggle: () => {
        update(previous => {
          const newTheme = previous === 'light' ? 'dark' : 'light'
          localStorage.setItem('theme', newTheme)
          return newTheme
        })
      },
    }
  }
  export const theme = createThemeStore()
</script>

<script>
  import DarkTheme from './DarkTheme.svelte'
  import LightTheme from './LightTheme.svelte'
</script>

{#if $theme === 'light'}
  <LightTheme />
{/if}
{#if $theme === 'dark'}
  <DarkTheme />
{/if}
