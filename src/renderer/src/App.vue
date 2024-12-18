<script setup lang="ts">
defineOptions({
  name: 'App'
})
</script>

<template>
  <!-- <div id="app" class="app"> -->
  <router-view />
  <!-- </div> -->
</template>

<style>
html {
  overflow-y: hidden;
  font-size: 12px;
}

/* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */
::-webkit-scrollbar {
  width: 2px; /* 滚动条宽度 */
  /* height: 2px; */
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
  /*border-radius: 10px;  !*滚动条的背景区域的圆角*!*/
  /*background-color: red;!*滚动条的背景颜色*!*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 99px; /*滚动条的圆角*/
  /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
  /*background-color: green;  !*滚动条的背景颜色*!*/
}
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  width: 100%;
}
</style>
