<script>
  import { fade } from 'svelte/transition'
  import { stores } from '@sapper/app'
  import { NotificationList } from '$components/notifications'
  import Header from '$components/Header.svelte'
  import ThemeLoader from '$components/themes/ThemeLoader.svelte'
  import Footer from '$components/Footer.svelte'
  import Loading from '$components/Loading.svelte'

  export let segment
  const { preloading } = stores()
</script>

<ThemeLoader />

<Header {segment} />

{#if !$preloading}
  <main in:fade>
    <slot />
  </main>
{:else}
  <div in:fade>
    <Loading what='page' />
  </div>
{/if}

<Footer />

<NotificationList />
