<div style="margin-top: 12px; cursor: default; font-size: 16px;">
  As I put more and more tasks onto my calendar, it created too much text that's increasingly hard to read.
  <br><br>
  Visual icons are promising, but the popular icon libraries are still very limited in expressiveness, and often just don't represent the tasks well enough.
  <br><br>
  Solution? Draw icons yourself (or just use your friends' and community's icons)
  The app saves these drawings, and displays them with an alternative UI 4x more compact:
  <br><br>

  <div style="display: flex; justify-content: center; align-items: start; gap: 16px; margin-top: 0px;">
    <img src="/text-tasks.png" style="width: 200px; height: 160px;">
    <div style="margin-top: 8px;">-></div>
    <img src="/icon-tasks.png" style="width: 204px; height: 40px;">
  </div>

  <div>
    <br>
    It's not cheap, <b>$10/month</b>. You probably don't need it if you're a light user. 
    But if you're someone with lots of habits and periodic routines, you'll be glad you spent extra for a more vibrant, powerful calendar.
  </div>

  <div style="display: flex; align-items: center; margin-top: 24px; ">
    <div style="height: 48px; border: 2px solid #9859B6; width: 160px; display: flex; align-items: center; border-radius: 24px; padding: 16px;">
      <a target="_blank" href="https://buy.stripe.com/8wMg2L4md6Le0aAdQR" style="margin-left: 4px; text-decoration: none;">
        Pay with Stripe
      </a>
    </div>
  
    <ReusableRoundButton on:click={unlockFeature}>
      Unlock
    </ReusableRoundButton>
  </div>
  <div style="font-size: 14px; margin-top: 16px; margin-left: 8px; rgb(80, 80, 80)">
    After you pay with Stripe, just press "unlock" :^)
  </div>

</div>

<script>
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'
  import { updateFirestoreDoc } from '/src/crud.js';
  import { user } from '/src/store.js'

  function unlockFeature () {
    if (confirm("Thank you for being a pioneer user - I'll make sure this is one of the best decisions you've ever made. (And please, never hesitate to share your honest opinions on how to improve the app :^).")) {
      updateFirestoreDoc(`/users/${$user.uid}`, {
        isSubscriber: true
      })
    }
  }
</script>