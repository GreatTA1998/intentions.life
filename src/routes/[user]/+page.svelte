{#if $user.allTasks}
  <MainPage/>
{/if}


<script>
  import MainPage from '$lib/MainPage.svelte'
  import { user } from '/src/store.js'
</script>