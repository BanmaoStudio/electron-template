<template>
  <div class="main-warpper">
    <div class="my-main">
      <div class="title-bar"></div>
      <h1>Main Window</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-bar {
  width: 100%;
  height: 24px;
  -webkit-app-region: drag;
  background-color: aqua;
}

.main-warpper {
  width: 100%;
  height: 100%;
  background-color: #191c1f;
  .my-main {
    width: 100%;
    height: 100%;
    border: 0.5px solid #495057;
    box-sizing: border-box;
  }
}
</style>
