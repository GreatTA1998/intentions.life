 <!-- specifically articulated vision with deadline and how-to-achieve, but no need to keep track of progress for now -->
 <div class="rounded-card">
  <div style="text-transform: uppercase; color: rgb(40, 40, 40); display: flex; align-items: center;">
    <span class="material-symbols-outlined" style="margin-right: 6px;">
      favorite
      </span>
    Friends & Loved Ones
  </div>

  <div style="margin-bottom: 24px;"></div>
  
  {#each friendsAndLovedOnes as person}
    <div style="display: flex; align-items: center; margin-bottom: 12px;">
      
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmT8NDYBa8lcbCZGxqYrJ_3cP72hKdyzUsoQ&usqp=CAU" style="width: 48px; height: 48px;">

      <div style="margin-left: 12px;">
        <div style="font-weight: 500;">{person}</div>
        <div style="display: flex; align-items: center;">
          <span class="material-symbols-outlined" style="margin-right: 4px; font-size: 20px;">
            cake
          </span>
          <div style="font-size: 14px;">Dec 18</div>
        </div>  
      </div>
    </div>
  {/each}

  <!-- <input class="section-title" 
    value={$user.myGoal1}
    on:input={(e) => debouncedUpdateUserDoc({ propertyName: 'myGoal1', newValue: e.target.value})}
  >

  <textarea class="reset-textarea section-description" style="font-weight: 400; width: 100%; height: 100px; margin-top: 6px;" 
    value={$user.myGoal1Description}
    on:input={(e) => debouncedUpdateUserDoc({ propertyName: 'myGoal1Description', newValue: e.target.value})}
  /> -->

  <div style="margin-bottom: 24px;"></div>

  <input class="section-title"
    value={$user.myGoal2}
    on:input={(e) => debouncedUpdateUserDoc({ propertyName: 'myGoal2', newValue: e.target.value})}
  >

  <textarea 
    class="reset-textarea section-description" 
    style="font-weight: 400; width: 100%; height: 100px; margin-top: 6px;" 
    value={$user.myGoal2Description}
    on:input={(e) => debouncedUpdateUserDoc({ propertyName: 'myGoal2Description', newValue: e.target.value})}
  />
</div>

<script>
  import _ from 'lodash'

  const debouncedUpdateUserDoc = _.debounce(updateUserDoc, 500)

  let friendsAndLovedOnes = []
</script>