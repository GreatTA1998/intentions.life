<!-- Don't put this logic on +layout, because it'd block home page from loading for new users -->
{#if $user.uid}
  <MobileView/>
{/if}

<script>
  import MobileView from '$lib/MobileView.svelte'

  import { user } from '/src/store.js'
</script>