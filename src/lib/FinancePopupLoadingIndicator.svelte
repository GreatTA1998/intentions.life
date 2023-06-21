<!-- <div class="loading-overlay"> -->
  <!-- <div class="loading-container"> -->
  <div style="
    width: 350px;   
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    padding: 0 50px;"
  >
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
  </div>
  <!-- </div> -->
<!-- </div> -->

<!-- scss not supported for now -->
<style lang="scss">
 $dotsize: 15px;

* {
  box-sizing: border-box;
}

body,
html {
  height: 100%;
}

body {
  background: #222;
}

.loading-overlay {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.loading-container {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  padding: 0 50px;
  
  &:before {
    content: 'loading';
    display: block;
    font-size: 1.5rem;
    position: absolute;
    top: -250%;
    left: 0;
    right: 0;
    color: white;
    text-align: center;
    opacity: .8;
  }
}

.loading-dot {
  position: relative;
  width: $dotsize;
  height: $dotsize;
  background: grey;
  border-radius: 50%;
  margin-right: $dotsize;
  animation: dot 1.5s cubic-bezier(.17, .67, .83, .67) infinite;
}

.loading-dot:nth-of-type(1) {
  margin-right: 0;
}

.loading-dot:nth-of-type(2) {
  animation-delay: .175s;
}

.loading-dot:nth-of-type(3) {
  animation-delay: .35s;
}

@keyframes dot {
  0% {
    transform: translate3d(-1000%, 0, 0);
    opacity: 0;
  }
  20% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  80% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(1000%, 0, 0);
    opacity: 0;
  }
}
</style>