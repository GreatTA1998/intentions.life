{#if !$hasFetchedUser}
  <div>Fetching your info...</div>
{:else}
  <slot>

  </slot>
{/if}

<script>
  import db from '../db.js'
  import { page } from '$app/stores'
  import { hasFetchedUser, user } from '../store.js'
  import { goto } from '$app/navigation'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import { getFirestore, doc, deleteDoc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'

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
