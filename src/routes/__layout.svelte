<!-- {#if !$hasFetchedUser}
  <div>Fetching your info...</div>
{:else}
  <slot>

  </slot>
{/if} -->

{#if !$hasLogoExited}
  <div 
    id="loading-screen-logo-start"
    style="opacity: 0; width: 30vw; height: 30vh"
    class="elementToFadeInAndOut center"
  >
    <img 
      src="/ola-full-size.jpg" 
      class="app-loading-logo center"
      alt="logo"
    />
  </div>
{/if}

<div class:invisible={!$hasLogoExited}>
  <slot>

  </slot>
</div>

<script>
  import db from '../db.js'
  import { page } from '$app/stores'
  import { hasFetchedUser, user, hasLogoExited } from '../store.js'
  import { goto } from '$app/navigation'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import { getFirestore, doc, deleteDoc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'
  import { onMount } from 'svelte'

  onMount(() => {
    const Elem = document.getElementById('loading-screen-logo-start')
    Elem.addEventListener('animationend', (e) => {
      hasLogoExited.set(true)
    })
  })

  onAuthStateChanged(getAuth(), async (resultUser) => {
    if (!resultUser) {
      user.set({})
    } 
    else {
      // partially hydrate the user so we can redirect away ASAP
      user.set({ 
        phoneNumber: resultUser.phoneNumber || '', // can be anonymous new user playing around
        uid: resultUser.uid, 
      })

      // query Firestore for this user
      const userRef = doc(getFirestore(), 'users/' + resultUser.uid)
      let dbUserSnapshot = await getDoc(userRef)

      if (!dbUserSnapshot.exists()) {
        await setDoc(userRef, {
          uid: resultUser.uid,
          phoneNumber: resultUser.phoneNumber || '',
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
        dbUserSnapshot = await getDoc(userRef) // seems like a redundant fetch, but keep for now
      } 

      // hydrate user doc fully
      user.set({ 
        id: dbUserSnapshot.id,
        ...dbUserSnapshot.data()
      })
      goto('/' + $user.uid)
    }
    hasFetchedUser.set(true) 
  })
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
