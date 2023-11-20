<div style="font-size: 28px; font-weight: 500; color: #091346">
  {convertMMDDToReadableMonthDayForm(getDateInMMDD(new Date()))}
</div>

<div style="margin-bottom: 18px;"></div>

<textarea class="reset-textarea" name="hide" placeholder="Write anything..." style="width: 100%; height: 90%; font-size: 16px; color: rgb(36, 33, 33)"></textarea>

<script>
   import { convertMMDDToReadableMonthDayForm, getDateInMMDD } from '/src/helpers.js'
</script>

<style>
  .reset-textarea {
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/
  }
</style>