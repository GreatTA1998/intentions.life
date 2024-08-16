<div style="margin-top: 20px; overflow-y: auto; width: 100%;">
  {#each transactions as transaction}
    <div style="display: flex; flex-wrap: nowrap;">
      {#if transaction.amount > 0}
        <div 
        style="font-size: {0.5 + (0.012 * transaction.amount)}rem; font-family: sans-serif;
          color: red;
          white-space: nowrap;
        "
        >
        -{transaction.amount}: {transaction.merchant_name ? transaction.merchant_name : transaction.name}, {transaction.date}
        </div>
      {:else}
        <div 
        style="font-size: {0.5 + (-1 * 0.012 * transaction.amount)}rem; font-family: sans-serif;
          color: green;
          white-space: nowrap;
        "
        >
          <!-- remove negative sign -->
        +{-1 * transaction.amount}: {transaction.merchant_name ? transaction.merchant_name : transaction.name}, {transaction.date}
        </div>
      {/if}
    </div>
  {/each}
</div>

<script>
  export let transactions
</script>