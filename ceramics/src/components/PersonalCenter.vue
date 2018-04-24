<template>
  <div class="personal-center">
    <head-page></head-page>
    <div class="personal">
      <div class="personal-info">
        <div class="img"></div>
        <div class="set-up l" @click="setUp">设置</div>
        <div class="sigin-out l" @click="userOut">退出账号</div>
      </div>
      <div class="right">
        <div class="first-enter" v-if="!isSetUpShow">
          <div class="create-new r">
            <div class="pic" @click="createNewItem">
              <img src="../assets/add.png" alt="">
            </div>
            <span>创建新收藏</span>
          </div>
          <div class="folder r">
            <div class="pic"></div>
            <span>作品名</span>
          </div>
          <div class="folder r">
            <div class="pic"></div>
            <span>作品名</span>
          </div>
        </div>
        <div class="set-up-show" v-if="isSetUpShow">
          <div class="border"></div>
          <h2>账户修改</h2>
          <div class="modify">
            <div class="tit">电子邮箱</div>
            <div class="email"><input type="email" placeholder="Email" /></div>
            <div class="tit">密码</div>
            <div class="password"><button @click="changePassword">更改密码</button></div>
            <div class="tit">性别</div>
            <div class="sex">
              <input type="radio" name="sex" />男
              <input type="radio" name="sex" />女
            </div>
            <div class="tit">昵称</div>
            <div class="nickname"><input type="text" placeholder="昵称" /></div>
            <div class="tit">头像</div>
            <div class="head-portrait">
              <img src="../assets/user.png" alt="">
              <button>更换图片</button>
            </div>
          </div>
          <div class="save">保存修改</div>
        </div>
      </div>
    </div>
    <div class="new-collections" v-if="createShow">
      <div class="alert" v-show="newCollection">
        <h2>创建新收藏</h2>
        <div class="name">
          <span>名称</span>
          <input type="text" placeholder="输入名称" />
        </div>
        <div class="cancel">
          <button @click="build">创建</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
      <div class="alert" v-show="siginOut">
        <h2>退出账号</h2>
        <div class="name">
          <span>确认退出当前帐号</span>
        </div>
        <div class="cancel">
          <button @click="signout">退出</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
      <div class="alert change_password" v-show="isChangePass">
        <h3>更改密码</h3>
        <div class="alter">
          <div class="code">旧密码</div>
          <input type="password" placeholder="单行输入" />
          <div class="forget">忘记密码？</div>
        </div>
        <div class="alter">
          <div class="code">新密码</div>
          <input type="password" placeholder="单行输入" />
        </div>
        <div class="alter">
          <div class="code">确认密码</div>
          <input type="password" placeholder="单行输入" />
        </div>
        <div class="cancel">
          <button @click="signout">确认</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadPage from './assembly/Header'
export default {
  name: 'personalcenter',
  data () {
    return {
      createShow: false,
      siginOut: false,
      isSetUpShow: false,
      newCollection: false,
      isChangePass: false
    }
  },
  methods: {
    setUp () {
      this.isSetUpShow = true
    },
    // 创建新收藏
    createNewItem () {
      this.createShow = true
      this.siginOut = false
      this.newCollection = true
      this.isChangePass = false
    },
    cancel () {
      this.createShow = false
    },
    build () {
      this.createShow = false
    },
    signout () {
      this.createShow = false
    },
    userOut () {
      this.createShow = true
      this.siginOut = true
      this.newCollection = false
      this.isChangePass = false
    },
    changePassword () {
      this.createShow = true
      this.siginOut = false
      this.newCollection = false
      this.isChangePass = true
    }
  },
  components: {
    HeadPage
  }
}
</script>

<style lang="less" scoped>
.personal-center {
  padding-top: 80px;
  .personal {
    width: 1250px;
    padding-top: 120px;
    margin: 0 auto;
    overflow: hidden;
  }
}
.personal-info {
  float: left;
  width: 237px;
  height: 511px;
  padding-right: 52px;
  padding-top: 20px;
  .img {
    width: 235px;
    height: 235px;
    margin: 0 0 73px 0;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
  }
  .l {
    width: 140px;
    height: 40px;
    border: 1px solid #ccc;
    margin: 0 auto 34px;
    text-align: center;
    line-height: 40px;
    border-radius: 40px;
    font-size: 22px;
    color: #666;
    cursor: pointer;
  }
  .set-up {
    text-align: right;
    letter-spacing: 32px;
  }
}
.right {
  float: left;
  .first-enter {
    width: 960px;
    min-height: 511px;
    border-left: 1px solid #bbb;
    padding-top: 20px;
    overflow: hidden;
    .create-new {
      .pic {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
          width: 47px;
        }
      }
    }
    .r {
      float: left;
      width: 258px;
      height: 210px;
      margin-left: 60px;
      // border: 1px solid #ccc;
      .pic {
        width: 256px;
        height: 170px;
        border: 2px solid #ccc;
        border-radius: 20px;
        margin-bottom: 10px;
      }
      span {
        font-size: 16px;
        color:  #666;
        padding-left: 20px;
      }
    }
  }
  .set-up-show {
    width: 918px;
    min-height: 511px;
    margin-top: -30px;
    position: relative;
    padding-left: 42px;
    .border {
      width: 1px;
      background: #ccc;
      height: 511px;
      position: absolute;
      top: 30px;
      left: 0;
    }
    h2 {
      font-size: 25px;
      color: #666;
      line-height: 36px;
      margin-bottom: 28px;
    }
    .modify {
      padding-left: 13px;
      .tit {
        line-height: 36px;
        font-size: 20px;
        color: #666;
        margin-bottom: 10px;
      }
      .email,.nickname {
        height: 51px;
        margin-bottom: 30px;
        input {
          border: 0;
          height: 51px;
          width: 338px;
          background: #e6e6e6;
          color: #888;
          font-size: 14px;
          border-radius: 6px;
          text-indent: 4px;
          outline: none;
        }
      }
      .password {
        button {
          width: 90px;
          height: 30px;
          color: #383838;
          background: #e6e6e6;
          border: 0;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          outline: none;
          margin: 14px 0;
        }
      }
      .sex {
        input {
          width: 24px;
          height: 24px;
          margin: 7px 9px 27px 0;
        }
      }
      .head-portrait {
        overflow: hidden;
        img {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 1px solid #ccc;
          display: block;
          float: left;
        }
        button {
          width: 90px;
          height: 30px;
          color: #383838;
          background: #e6e6e6;
          border: 0;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          outline: none;
          margin: 50px 0 0 20px;
        }
      }
    }
    .save {
      width: 113px;
      height: 43px;
      background: #e51c23;
      border-radius: 4px;
      color: #fff;
      font-size: 18px;
      font-weight: 800;
      line-height: 43px;
      text-align: center;
      margin: 30px auto 0;
    }
  }
}
.new-collections {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 99;
  .alert {
    width: 560px;
    height: 213px;
    background: #fff;
    border-radius: 10px;
    position: relative;
    top: 50%;
    left: 50%;
    margin: -106px 0 0 -280px;
    h2 {
      height: 60px;
      border-bottom: 1px solid #ccc;
      line-height: 60px;
      padding-left: 25px;
      font-weight: 400;
      font-size: 25px;
      color: #010101;
    }
    .name {
      height: 70px;
      line-height: 70px;
      font-size: 20px;
      border-bottom: 1px solid #ccc;
      span {
        padding: 0 60px 0 50px;
      }
      input {
        width: 350px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
      }
    }
    .cancel {
      button {
        float: right;
        width: 50px;
        height: 30px;
        font-size: 14px;
        background: #ededed;
        color: #636363;
        border: 0;
        border-radius: 4px;
        margin-top: 20px;
        margin-right: 20px;
        cursor: pointer;
        outline: none;
      }
    }
  }
  .change_password {
    width: 476px;
    height: 380px;
    margin: -280px 0 0 -238px;
    h3 {
      line-height: 41px;
      font-size: 25px;
      color: #666;
      padding: 22px 0 19px 0;
      font-weight: 400;
      text-align: center;
    }
    .alter {
      padding-left: 56px;
      overflow: hidden;
      margin-bottom: 20px;
      .forget {
        line-height: 23px;
        font-size: 14px;
        color: #666;
        text-indent: 88px;
        padding: 10px 0;
        cursor: pointer;
      }
      input {
        width: 228px;
        height: 42px;
        border: 0;
        background: #e6e6e6;
        border-radius: 4px;
        text-indent: 6px;
        outline: none;
      }
      .code {
        width: 82px;
        line-height: 42px;
        font-size: 16px;
        color: #666;
        float: left;
      }
    }
    .cancel {
      border-top: 1px solid #e6e6e6;
      height: 60px;
      position: relative;
      margin-top: 28px;
      button {
        margin: 10px 30px 0 0;
        width: 51px;
        height: 40px;
      }
    }
  }
}
</style>
