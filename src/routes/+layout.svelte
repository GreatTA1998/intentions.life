{#if !$hasLogoExited}
  <div 
    id="loading-screen-logo-start"
    style="opacity: 0; width: 30vw; height: 30vh"
    class="elementToFadeInAndOut center"
  >
    <img 
      src="/trueoutput-square-nobg.png" 
      class="app-loading-logo center"
      alt="logo"
      style="width: 48px; height: 48px;"
    />
  </div>
{/if}

<div class:invisible={!$hasLogoExited}>
  <slot>

  </slot>
</div>

<script>
  import "/src/app.css";
  import db from '../db.js'
  import { page } from '$app/stores'
  import { hasFetchedUser, user, hasLogoExited } from '../store.js'
  import { goto } from '$app/navigation'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import { getFirestore, doc, deleteDoc, getDoc, setDoc, updateDoc, increment, snapshotEqual, onSnapshot } from 'firebase/firestore'
  import { onDestroy, onMount } from 'svelte'
  import { updateFirestoreDoc } from "/src/crud.js"
  import posthog from 'posthog-js'

  let unsubUserSnapListener = null

  onMount(() => {
    // fetching user takes around 300 - 500 ms
    onAuthStateChanged(getAuth(), async (resultUser) => {
      // user not logged in
      if (!resultUser) {
        user.set({})
        goto('/')

        // see how new visitors interacts with home page demos
        posthog.init('phc_Cm2c1eB0MCZLTjJDYHklZ7GUp0Ar7p5bIpF5hkCJPdo',
            {
                api_host: 'https://us.i.posthog.com',
                person_profiles: 'always' // or 'always' to create profiles for anonymous users as well
            }
        )
      } 
      
      else { // USER IS LOGGED INTO FIREBASE AUTH
        const urlParts = $page.url.pathname.split("/")

        // for a full path, urlParts is ['', 'PfxP5N71jQVzDejF9tYwTgrVtGz2', 'camera']
        if (urlParts.length === 3 && urlParts[2] === 'camera' || urlParts[2] === 'mobile') {
          // don't redirect
        }
        // ['', 'sentry-example']
        else if (urlParts.length === 2 && urlParts[1] === 'sentry-example') {
          // don't redirect either
        }
        else {
          goto('/' + resultUser.uid)
        }

        // partially hydrate the user so we can redirect away ASAP (NOTE: v1 this shouldn't make a lot of difference to load time)
        user.set({ 
          phoneNumber: resultUser.phoneNumber || '',
          uid: resultUser.uid, 
        })

        // handle the snapshot listener
        const ref = doc(db, '/users/' +  resultUser.uid)
        unsubUserSnapListener = onSnapshot(ref, async (snap) => {
          if (!snap.exists()) {
            initializeNewFirestoreUser(ref, resultUser)
          }
          else {
            user.set({ ...snap.data() }) // augment with id, path, etc. when needed in the future

            if (!$hasFetchedUser) {
              guaranteeBackwardsCompatibility($user)
              hasFetchedUser.set(true) 
            }
          }
        })
      }
    })

    const Elem = document.getElementById('loading-screen-logo-start')
    Elem.addEventListener('animationend', (e) => {
      hasLogoExited.set(true)
    })
  })

  // should be unnecessary because +layout getting destroyed means the App is closed
  onDestroy(() => {
    if (unsubUserSnapListener) unsubUserSnapListener()
  })

  // NOTE: somewhat brittle code. If `.journal` is every empty temporariliy, for whatever reason, the entire journal will wipe.
  function guaranteeBackwardsCompatibility (userDoc) {
    const correctionObj = {}
    if (!userDoc.journal) correctionObj.journal = {}
    if (!userDoc.journalTitleFromMMDD) correctionObj.journalTitleFromMMDD = {}
    if (!userDoc.reusableTaskTemplates) correctionObj.reusableTaskTemplates = []

    updateFirestoreDoc(`/users/${userDoc.uid}`, correctionObj)
  }


  async function initializeNewFirestoreUser (ref, resultUser) {
    return new Promise(async (resolve) => {
      await setDoc(ref, {
        uid: resultUser.uid,
        phoneNumber: resultUser.phoneNumber || '',
        email: resultUser.email || '',
        // allTasks: []
      }, { merge: true })
      resolve()
    })
  }
</script>

<style>
  .invisible {
    display: none; 
  }
  /* From Prabhakar's centering solution that works for iOS unlike StackOverflow
  https://github.com/project-feynman/v3/blob/d864f54d9a69e6cdf0beb7818e8b07a85cebb7eb/src/components/SeeExplanation.vue */
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  .elementToFadeInAndOut {
    animation: fadeInOut 1s ease-out 1 forwards;
  }
  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @media screen and (min-width: 320px) {
    .app-loading-logo {
      width: 110px; 
      height: 110px;
      border-radius: 18px;
    }
  }
  @media screen and (min-width: 768px) {
    .app-loading-logo {
      width: 250px;
      height: 250px;
      border-radius: 40px;
    }
  }
</style>
