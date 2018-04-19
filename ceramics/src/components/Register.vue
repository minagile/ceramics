<template>
  <div class="register">
    <div class="popup" v-show="false">
      <div class="user_register">
        <div class="content">
          <h2>Welcome</h2>
          <input type="text" v-model="userPhone" placeholder="手机号/邮箱" />
          <input type="password" name="password" v-model="password" placeholder="密码" />
          <input type="password" name="confirm_password" v-model="confirmPassword" placeholder="确认密码" />
          <button>注册</button>
          <a class="to_login">登录</a>
        </div>
      </div>
    </div>
    <div class="popup" v-show="false">
      <login></login>
    </div>
    <div class="popup">
      <ForgetPassword></ForgetPassword>
    </div>
  </div>
</template>

<script>
import login from './Login'
import ForgetPassword from './ForgetPassword'
export default {
  name: 'register',
  data () {
    return {
      userPhone: '',
      password: '',
      confirmPassword: ''
    }
  },
  components: {
    login,
    ForgetPassword
  }
}
</script>

<style lang="less" scoped>
.register {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.popup {
  width: 500px;
  height: 300px;
  background: rgba(255, 255, 255, 0.6);
  position: relative;
  left: 50%;
  top: 50%;
  margin-top: -150px;
  margin-left: -250px;
  border-radius: 10px;
  text-align: center;
  .user_register {
    height: 100%;
    .content {
      border-right: 2px solid rgba(0, 0, 0, 0.3);
    }
  }
}
.content {
  width: 300px;
  height: 100%;
  h2 {
    text-align: center;
    height: 86px;
    line-height: 100px;
  }
  input {
    display: block;
    margin: 0 auto 6px;
    width: 144px;
    height: 24px;
    padding-left: 10px;
    background: #fff;
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
  .to_login {
    cursor: pointer;
    font-size: 12px;
    color: #666;
  }
}
</style>
