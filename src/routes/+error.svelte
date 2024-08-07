<script>
  import { page } from '$app/stores';
  import { dev } from '$app/environment';
</script>

<h1>Error {$page.status}: {$page.error.message}</h1>

{#if $page.error.stack}
  <pre>{$page.error.stack}</pre>
{/if}