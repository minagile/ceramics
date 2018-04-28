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
        <div class="left">
          <div class="cover"></div>
        </div>
      </div>
    </div>
    <div class="popup" v-show="login">
      <login @userRegister="backToRegister" @forGet="forgetPass" @loginSuccess="successLogin"></login>
    </div>
    <div class="popup fo" v-show="forget">
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
    successLogin () {
      this.$emit('login')
    },
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
          if (status.CODE === '200') {
            this.register = false
            this.login = true
          } else {
            alert(status.MESSAGE)
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
  z-index: 999;
}
.popup {
  width: 420px;
  height: 250px;
  background: rgba(255, 255, 255, 0.7);
  position: relative;
  left: 50%;
  top: 50%;
  margin-top: -125px;
  margin-left: -210px;
  border-radius: 10px;
  text-align: center;
  overflow: hidden;
  &.fo {
    // background-image: url(../../assets/pic11.jpg);
    background-size: cover;
  }
  .user_register {
    height: 100%;
    .content {
      border-right: 2px solid rgba(0, 0, 0, 0.3);
      float: left;
    }
    .left {
      width: 146px;
      height: 100%;
      background-image: url(../../assets/pic10.jpg);
      background-size: cover;
      position: relative;
      .cover {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.7);
      }
      float: right;
    }
  }
}
.content {
  width: 272px;
  height: 100%;
  h2 {
    text-align: center;
    height: 26px;
    font-size: 26px;
    color: #333;
    line-height: 26px;
    padding: 36px 0 18px 0;
  }
  input {
    display: block;
    margin: 0 auto 8px;
    width: 136px;
    height: 24px;
    padding-left: 10px;
    background: #fff;
    border: 0;
    color: #666;
    border-radius: 4px;
    outline: none;
  }
  button {
    display: block;
    margin: 6px auto 0;
    width: 64px;
    height: 16px;
    font-size: 12px;
    background: rgb(224, 27, 27);
    &:hover {
      background: rgb(182, 23, 23);
    }
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    border: 0;
    outline: none;
  }
  .to_login {
    cursor: pointer;
    font-size: 10px;
    color: #666;
    text-decoration: underline;
  }
}
</style>
