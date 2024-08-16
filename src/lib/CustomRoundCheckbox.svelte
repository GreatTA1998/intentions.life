<div class="container">
  <div class="round">
    <input type="checkbox" checked class="checkbox" />
    <label for="checkbox"></label>
  </div>
</div>

<style>
.round {
  position: relative;
}

.round label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 20px;
  width: 20px;
  left: 0;
  position: absolute;
  top: 0;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 7px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 12px;
}

.round input[type="checkbox"] {
  visibility: hidden;
}

.round input[type="checkbox"]:checked + label {
  background-color: darkcyan;
  border-color: darkcyan;
}

.round input[type="checkbox"]:checked + label:after {
  opacity: 1;
}

.container {
  margin: 0 auto;
}
</style>