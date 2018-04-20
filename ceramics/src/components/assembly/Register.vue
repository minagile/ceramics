<template>
  <div class="register">
    <div class="popup" v-show="register">
      <div class="user_register">
        <div class="content">
          <h2>Welcome</h2>
          <input type="text" v-model="userPhone" placeholder="手机号/邮箱" />
          <input type="password" name="password" v-model="password" placeholder="密码" />
          <input type="password" name="confirm_password" v-model="confirmPassword" placeholder="确认密码" />
          <button @click="userRegister">注册</button>
          <a class="to_login" @click="toLogin">登录</a>
        </div>
      </div>
    </div>
    <div class="popup" v-show="login">
      <login @userRegister="backToRegister" @forGet="forgetPass"></login>
    </div>
    <div class="popup" v-show="forget">
      <ForgetPassword @confirm="showLogin"></ForgetPassword>
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
      confirmPassword: '',
      register: true,
      login: false,
      forget: false
    }
  },
  methods: {
    // 用户注册
    userRegister () {
      // console.log(this.userPhone, this.password)
      if (this.userPhone === '') {
        alert('请输入用户名')
      } else if (this.password === '') {
        alert('请输入密码')
      } else {
        if (this.userPhone.indexOf('@') === -1) {
          if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.userPhone))) {
            alert('手机号码有误，请重填')
          } else {
            this.passwordAndConfirm()
          }
        } else {
          if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.userPhone))) {
            alert('邮箱有误，请重填')
          } else {
            this.passwordAndConfirm()
          }
        }
      }
    },
    passwordAndConfirm () {
      if (this.password === this.confirmPassword) {
        let that = this
        let config = { headers: { 'Content-Type': 'multipart/form-data' } }
        that.$http.post('http://www.temaxd.com/Hooott/registerUser.cz?account=' + this.userPhone + '&password=' + this.password, {}, config).then(res => {
          let status = JSON.parse(res.data)
          if (status[0].CODE === '200') {
            this.register = false
            this.login = true
          } else {
            alert(status[1].MESSAGE)
          }
        })
      } else {
        alert('两次输入不一致')
      }
    },
    // 跳转到登录
    toLogin () {
      this.register = false
      this.login = true
    },
    // 回到注册界面
    backToRegister () {
      this.register = true
      this.login = false
    },
    // 忘记密码
    forgetPass () {
      this.forget = true
      this.login = false
      this.register = false
    },
    // 登录界面
    showLogin () {
      this.login = true
      this.register = false
      this.forget = false
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
    border: 0;
    outline: none;
  }
  .to_login {
    cursor: pointer;
    font-size: 12px;
    color: #666;
  }
}
</style>
