{#if !$hasLogoExited}
  <div 
    id="loading-screen-logo-start"
    style="opacity: 0; width: 30vw; height: 30vh"
    class="elementToFadeInAndOut center"
  >
    <img 
      src="/hand-drawn-twig-no-bg-cropped.png" 
      class="app-loading-logo center"
      alt="logo"
      style="width: 38px; height: 48px;"
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

  let unsubUserSnapListener = null

  onMount(() => {
    onAuthStateChanged(getAuth(), async (resultUser) => {
      // user not logged in
      if (!resultUser) {
        user.set({})
        goto('/')
      } 
      else {
        // USER IS LOGGED INTO FIREBASE AUTH
        goto('/' + resultUser.uid)

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
        allTasks: [
          {
            name: 'Try life-organizer',
            children: [
              {
                name: 'Create a sub-task by hovering to the approximate region',
                children: []
              },
              {
                name: 'Schedule a task by dragging it to the calendar',
                children: []
              },
              {
                name: 'Schedule future task by inputting the date',
                children: []
              }
            ]
          },
          {
            name: 'Work',
            children: [
              {
                name: 'Pitch idea to santa',
                startDate: '12/25',
                startTime: '12:00',
                children: [
                  {
                    name: 'Email draft 1 to Rudolf',
                    children: []
                  },
                  {
                    name: 'Follow-up with Rudolf',
                    startDate: '12/01',
                    startTime: '12:00',
                    children: []
                  }
                ]
              }
            ]
          },
          {
            name: 'Life-keeping',
            notes: 'Press ENTER to save changes e.g. repeat, schedule, etc.',
            children: [
              {
                name: 'meditate',
                children: []
              }
            ]
          }
        ]
      })

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
