<template>
  <div class="login-warpper" style="-webkit-app-region: drag">
    <div class="overlay-left">
      <h1>Hello！</h1>
      <p>欢迎使用加油站运营管理系统！</p>
    </div>

    <div class="sign-up-container">
      <div class="set-warpper" style="-webkit-app-region: no-drag"></div>
      <h1>登录</h1>
      <div class="sign-warpper" style="-webkit-app-region: no-drag">
        <input v-model="form.account" type="text" placeholder="用户名/手机号" />
        <input v-model="form.password" type="password" placeholder="密码" />
        <button class="form-btn" @click="login">登录</button>
        <span class="forget">忘记密码</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const { ipcRenderer } = window.electron || ''

defineOptions({
  name: 'Login'
})

const form = ref({
  account: '',
  password: ''
})

const login = () => {
  if (form.value.account && form.value.password) {
    console.log('login', form.value)
    ipcRenderer && ipcRenderer.send('openMainWindow')
  } else {
    alert('请输入用户名和密码')
  }
}
</script>

<style lang="scss">
.login-warpper {
  width: 100%;
  height: 480px;
  border-radius: 10px;
  background: #ebecf0;
  display: flex;
  .sign-up-container {
    width: 50%;
    height: 100%;
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .set-warpper {
      position: absolute;
      top: 0px;
      right: 0px;
      display: flex;
      align-items: flex-end;
      padding: 8px;
      .el-icon {
        padding: 4px;
        border-radius: 2px;
        color: #606266;
        &:hover {
          background-color: #d4d6db;
        }
      }
    }
    h1 {
      color: #000;
    }
    .sign-warpper {
      display: flex;
      flex-direction: column;
      .info {
        height: 12px;
        display: inline-block;
        color: #e6a23c;
        font-size: 12px;
      }
      input {
        background: #eee;
        padding: 16px;
        margin: 8px 0;
        width: 200px;
        border: 0;
        outline: 0;
        border-radius: 20px;
        box-shadow:
          inset 7px 2px 10px #babebc,
          inset -5px -5px 12px #fff;
        color: #000;
      }
      .form-btn {
        margin-top: 20px;
        box-shadow:
          -5px -5px 10px #fff,
          5px 5px 8px #babebc;
        border-radius: 20px;
        padding: 15px 45px;
        border: 0;
        background: none;
        color: #000;
        cursor: pointer;
      }
      .forget {
        margin-top: 12px;
        font-size: 12px;
        color: #000;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
        cursor: pointer;

        &:hover {
          color: #3360e5;
        }
      }
    }
  }
  .overlay-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    justify-content: center;
    align-items: center;
    background-color: #3360e5;
    color: #fff;
    transition: all 0.5s;
  }
}
</style>
