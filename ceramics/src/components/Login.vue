<template>
  <div class="login">
    <div class="content">
      <h2>Welcome</h2>
      <input type="text" placeholder="手机/邮箱" v-model="user" />
      <input type="password" placeholder="密码" v-model="password" />
      <a class="forget">忘记密码？</a>
      <button>登录</button>
      <a class="register">注册</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: '',
      password: ''
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  .content {
    float: right;
    width: 300px;
    height: 100%;
    border-left: 2px solid rgba(0, 0, 0, 0.3);
    h2 {
      height: 100px;
      line-height: 120px;
    }
    input {
      display: block;
      width: 144px;
      height: 24px;
      padding-left: 10px;
      margin: 6px auto;
      border: 0;
      border-radius: 4px;
      outline: none;
    }
    button {
      display: block;
      margin: 10px auto 0;
      width: 100px;
      height: 24px;
      background: rgb(224, 27, 27);
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      outline: none;
    }
    a {
      cursor: pointer;
    }
    .forget {
      font-size: 14px;
    }
    .register {
      font-size: 12px;
    }
  }
}
</style>
