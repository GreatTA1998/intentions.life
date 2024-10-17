<script>
  import { user, doodleIcons } from '/src/store.js'
  import PremiumPopup from './PremiumPopup.svelte'
  import BasicWhiteboard from './BasicWhiteboard.svelte'
  export let template = {};
  export let updateTemplate = () => {};
  let isShowingPremiumPopup = false


  function handleDeleteIcon({ id, url }) {
    if (confirm('Are you sure you want to delete this icon?')) {
      Icons.deleteRecursively({ id, uid: $user.uid, url })
      $doodleIcons = $doodleIcons.filter((icon) => icon.id !== id)
    }
  }


</script>

{#if !$user.isSubscriber}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={() => (isShowingPremiumPopup = !isShowingPremiumPopup)}
    style=""
    class="premium-intro-button"
  >
    <span class="material-symbols-outlined" style="margin-right: 4px;">
      forest
    </span>

    <div style="font-weight: 600;">Get doodle icons</div>
  </div>
  {#if isShowingPremiumPopup}
    <PremiumPopup />
  {/if}
{:else}
  <div style="margin-top: 16px; display: flex; width: 100%; flex-wrap: wrap;">
    {#if $doodleIcons}
      {#each $doodleIcons as doodleIcon}
        <div>
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <img
            on:click={() => updateTemplate({ iconURL: doodleIcon.url })}
            src={doodleIcon.url}
            style="width: 48px; height: 48px; cursor: pointer;"
            class:orange-border={template.iconUrl === doodleIcon.url}
          />
          {#if doodleIcon.createdBy === $user.uid}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              on:click={() => {
                handleDeleteIcon({
                  id: doodleIcon.id,
                  url: doodleIcon.url
                })
              }}
              style="cursor: pointer; font-size: 14px;"
            >
              Delete
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>

  <div style="margin-top: 16px; display: flex; justify-content: center">
    <BasicWhiteboard />
  </div>
{/if}
