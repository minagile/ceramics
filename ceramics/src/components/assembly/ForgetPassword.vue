<template>
  <div class="forget_password">
    <h2>忘记密码</h2>
    <input type="text" v-model="user" placeholder="手机号/邮箱" />
    <div class="code">
      <input type="text" v-model="verification" placeholder="验证码" />
      <button class="get" @click="code($event)">获取验证码<span v-show="timeOut">{{ num }}</span></button>
    </div>
    <input type="password" v-model="password" placeholder="密码" />
    <input type="password" v-model="confirm" placeholder="确认密码" />
    <button @click="confirmChange">确认修改</button>
    <div @click="backToLogin">返回登录</div>
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
      confirm: '',
      data: '',
      num: 60,
      timeOut: false
    }
  },
  mounted () {
  },
  methods: {
    backToLogin () {
      this.$emit('confirm')
    },
    // 倒计时
    countDown (count, e) {
      e.style.background = '#ccc'
      this.num = count + 's'
      let iTimer = setInterval(() => {
        count--
        this.num = count + 's'
        if (count <= 0) {
          clearInterval(iTimer)
          this.timeOut = false
          e.style.background = 'red'
        }
      }, 1000)
    },
    // 获取验证码
    code (ev) {
      if (this.timeOut === false) {
        if (this.user === '') {
          alert('您还没有填写用户名')
        } else {
          let that = this
          let config = { headers: { 'Content-Type': 'multipart/form-data' } }
          if (this.user.indexOf('@') === -1) {
            // 手机发送验证码
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.user))) {
              alert('手机号码有误，请重填')
            } else {
              that.$http.post('http://www.temaxd.com/Hooott/sendPhone.cz?phone=' + this.user, {}, config).then(res => {
                let status = JSON.parse(res.data)
                // console.log(status)
                this.timeOut = true
                this.countDown(60, ev.path[0])
                this.data = status.RAND
              })
            }
          } else {
            // 邮箱验证
            if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.user))) {
              alert('邮箱有误，请重填')
            } else {
              that.$http.post('http://www.temaxd.com/Hooott/sendEmail.cz?email=' + this.user, {}, config).then(res => {
                let status = JSON.parse(res.data)
                // console.log(status)
                this.timeOut = true
                this.countDown(60, ev.path[0])
                this.data = status[1].RAND
              })
            }
          }
        }
      }
    },
    // 确认修改
    confirmChange () {
      if (this.user === '') {
        alert('请输入用户名')
      } else if (this.password === '') {
        alert('请输入密码')
      } else {
        if (this.password === this.confirm) {
          if (this.user.indexOf('@') === -1) {
            // 手机
            if (this.verification === this.data) {
              let that = this
              let config = { headers: { 'Content-Type': 'multipart/form-data' } }
              that.$http.post('http://www.temaxd.com/Hooott/forgetUser.cz?account=' + this.user + '&password=' + this.password, {}, config).then(res => {
                let change = JSON.parse(res.data)
                console.log(change)
                if (change.CODE === '200') {
                  console.log(change.MESSAGE)
                  this.$emit('confirm')
                } else {
                  alert(change.MESSAGE)
                }
              })
            } else {
              alert('验证码填写不正确')
            }
          } else {
            // 邮箱
            if (this.verification === this.data) {
              let that = this
              let config = { headers: { 'Content-Type': 'multipart/form-data' } }
              that.$http.post('http://www.temaxd.com/Hooott/forgetUser.cz?account=' + this.user + '&password=' + this.password, {}, config).then(res => {
                let change = JSON.parse(res.data)
                if (change.CODE === '200') {
                  console.log(change.MESSAGE)
                  this.$emit('confirm')
                } else {
                  alert(change.MESSAGE)
                }
              })
            } else {
              alert('验证码填写不正确')
            }
          }
        }
      }
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
      width: 60px;
      float: left;
    }
    .get {
      width: 82px;
      height: 24px;
      line-height: 24px;
      margin: 6px 0;
      background: red;
      border: 0;
      outline: none;
      color: #fff;
      border-radius: 4px;
      float: right;
      font-size: 12px;
      cursor: pointer;
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
