<div class="floating-button">
  <slot>
    
  </slot>
</div>

<style>
  .floating-button {
    position: absolute;
    right: 16px;
    bottom: calc(var(--bottom-navbar-height) + 16px);

    border: 4px solid black;
    height: 72px;
    width: 72px;
    border-radius: 36px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>