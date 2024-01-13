<!-- i.e. the user is fully hydrated, with properties like `journal` already initialized -->
{#if $user.allTasks}
  <MainPage/>
{/if}


<script>
  import MainPage from '$lib/MainPage.svelte'
  import { user } from '/src/store.js'
</script>