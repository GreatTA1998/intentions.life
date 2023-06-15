<div class="snack-wrap">
  <!-- <input type="checkbox" class="snackclose animated" id="close"/><label class="snacklable animated" for="close"></label>   -->

  <!-- animated -->
  <div class="snackbar" style="display: flex; align-items: center;">
     <p>"{$mostRecentlyCompletedTaskName}" will now be hidden because it's completed</p>
     <div style="margin-right: 2px; margin-left: auto;">
      <a on:click={undoComplete}>Undo</a>
  
     </div>
  </div>
</div>

<p>CSS Only Snackbar, uses checkbox:checked to change animation, with covering lable to set checked.</p>

<script>
  import { mostRecentlyDeletedOrCompletedTaskID, mostRecentlyCompletedTaskName } from "/src/store";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher()

  function undoComplete () {
    console.log('undo')
    dispatch('task-done', { id: $mostRecentlyDeletedOrCompletedTaskID })
  }

</script>

<style>

a {
  font-family: Roboto,Arial,sans-serif;
  flex: 1;
  background-color: #323232;
  color: #fff;
  padding-top: 5px; 
  padding-bottom: 5px;
  padding-left: 6px;
  padding-right: 6px;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease-out;
   border: 1px solid #000;
  font-family: sans-serif;
  font-size: 1rem;
  height: 5px;
}

a:hover,
a:focus {
  border: 1px solid #000;
  background-color: #fff;
  color: #323232;
}

.snack-wrap {
  display:block;
  position:fixed;
  bottom:0px;
  left: 50%;
  right: 50%;
  padding:0px;

  margin-left: -225px; 
  /* half of width */
  width: 450px;
}

.snackbar {
  display:block;
  background:#222;
  border:#f2f2f2;
  padding:10px 40px 10px 20px;
  color:#fff;
  font-family:Arial;
  position:relative;
  left:0px;
  z-index:9;
} 
.snackclose, label {
  bottom:-70px;
  position:absolute;
  border:0;
}
.snackclose {
  display:none;
  z-index:10;
}
label {
  z-index:11;
  display:block;
  width:100%;
  height:100%;
  color:rgba(255,255,255,0.8);
  cursor:pointer;
}
/* .animated {
  animation-name: snackbar-show;
  animation-duration: 1s;
  animation-direction: forwards;
  animation-timing-function: ease-in-out;
  animation-delay:1s;
  animation-fill-mode: forwards;
} */
/* .snackclose:checked~.snackbar, .snackclose:checked, .snackclose:checked+label {
  animation-name: snackbar-hide;
  animation-delay:0s;
} */
@keyframes snackbar-show {
   0%{ bottom:-70px; }
  90%, 95% {bottom:15px; }
  92.5%, 100% {bottom:10px; }
} 
/* @keyframes snackbar-hide {
   0%, 7.5% {bottom:10px; }
  5%,10% {bottom:15px; }
  100% {bottom:-70px; }
} */
</style>