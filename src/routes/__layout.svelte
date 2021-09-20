<script>
  import { fade } from 'svelte/transition'
  import { navigating } from '$app/stores'
  import { NotificationList } from '$lib/notifications'
  import Header from '$lib/Header.svelte'
  import Footer from '$lib/Footer.svelte'
  import Loading from '$lib/Loading.svelte'
  import ThemeLoader from '$lib/themes/ThemeLoader.svelte'
</script>

<ThemeLoader />
<Header />

{#if !$navigating}
  <main in:fade>
    <slot />
  </main>
{:else}
  <div in:fade>
    <Loading what="page" />
  </div>
{/if}

<Footer />

<NotificationList />
