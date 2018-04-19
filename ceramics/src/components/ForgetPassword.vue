<template>
  <div class="forget_password">
    <h2>忘记密码</h2>
    <input type="text" v-model="user" placeholder="手机号/邮箱" />
    <div class="code">
      <input type="text" v-model="verification" placeholder="验证码" />
      <div class="get">获取验证码</div>
    </div>
    <input type="password" v-model="password" placeholder="密码" />
    <input type="password" v-model="confirm" placeholder="确认密码" />
    <button>确认修改</button>
  </div>
</template>

<script>
export default {
  name: 'forgetpassword',
  data () {
    return {
      user: '',
      verification: '',
      password: '',
      confirm: ''
    }
  }
}
</script>

<style lang="less" scoped>
.forget_password {
  height: 100%;
  h2 {
    height: 90px;
    line-height: 120px;
    color: #fff;
  }
  .code {
    width: 154px;
    height: 36px;
    margin: 0 auto;
    input {
      width: 76px;
      float: left;
    }
    .get {
      width: 64px;
      height: 24px;
      line-height: 24px;
      margin: 6px 0;
      background: red;
      color: #fff;
      border-radius: 4px;
      float: right;
      font-size: 12px;
    }
  }
  input {
    width: 144px;
    height: 24px;
    display: block;
    padding-left: 10px;
    border: 0;
    border-radius: 4px;
    margin: 6px auto;
    outline: none;
  }
  button {
    width: 100px;
    height: 24px;
    color: #fff;
    background: red;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }
}
</style>
