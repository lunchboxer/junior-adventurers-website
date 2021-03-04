<script>
  import { onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'
  import { stores } from '@sapper/app'
  import { NotificationList } from '../components/notifications'
  import Header from '../components/Header.svelte'
  import ThemeLoader from '../components/themes/ThemeLoader.svelte'
  import Footer from '../components/Footer.svelte'
  import Loading, { loading } from '../components/Loading.svelte'

  export let segment
  const { preloading } = stores()

  const unsubscribe = preloading.subscribe(value => {
    loading.set(value)
  })

  onDestroy(unsubscribe)
</script>

<ThemeLoader />

<Header {segment} />

{#if $loading === false}
  <main transition:fade>
    <slot />
  </main>
{:else}
  <div transition:fade>
    <Loading />
  </div>
{/if}

<Footer />

<NotificationList />
