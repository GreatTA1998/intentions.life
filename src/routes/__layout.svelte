{#if hasFetchedUser}
  <slot>

  </slot>
{:else}
  <div>Fetching your info...</div>
{/if}

<script>
  import db from '../db.js'
  import { hasFetchedUser, user } from '../store.js'
  import { page } from '$app/stores'
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
          allTasks: [{
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
          }]
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
    
    // hasFetchedUser.set(true) 
  })
</script>
