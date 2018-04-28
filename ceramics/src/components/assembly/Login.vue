<template>
  <div class="login">
    <div class="content">
      <h2>Welcome</h2>
      <input type="text" placeholder="手机/邮箱" v-model="user" />
      <input type="password" placeholder="密码" v-model="password" />
      <a class="forget" @click="forgetPass">忘记密码？</a>
      <button @click="SignIn">登录</button>
      <a class="register" @click="toRegister">注册</a>
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
  },
  methods: {
    SignIn () {
      if (this.user === '') {
        alert('请输入用户名')
      } else if (this.password === '') {
        alert('请输入密码')
      } else {
        if (this.user.indexOf('@') === -1) {
          // this.passwordAndConfirm()
          if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.user))) {
            alert('手机号码有误，请重填')
          } else {
            this.passwordAndConfirm()
          }
        } else {
          if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.user))) {
            alert('邮箱有误，请重填')
          } else {
            this.passwordAndConfirm()
          }
        }
      }
    },
    passwordAndConfirm () {
      let that = this
      let config = { headers: { 'Content-Type': 'multipart/form-data' } }
      that.$http.post('http://www.temaxd.com/Hooott/userLogin.cz?account=' + this.user + '&password=' + this.password, {}, config).then(res => {
        let status = JSON.parse(res.data)
        console.log(status)
        if (status[0].CODE === '200') {
          // alert(status[1].MESSAGE)
          this.$emit('loginSuccess')
          localStorage.setItem('token', JSON.stringify(status[2].userId))
        } else {
          alert(status[1].MESSAGE)
        }
      })
    },
    toRegister () {
      this.$emit('userRegister')
    },
    forgetPass () {
      this.$emit('forGet')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  .content {
    float: right;
    width: 272px;
    height: 100%;
    border-left: 2px solid rgba(0, 0, 0, 0.3);
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
      color: #ccc;
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
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      border: 0;
      outline: none;
    }
    a {
      cursor: pointer;
    }
    .forget {
      font-size: 14px;
    }
    .register {
      cursor: pointer;
      font-size: 10px;
      color: #ccc;
      text-decoration: underline;
    }
  }
}
</style>
