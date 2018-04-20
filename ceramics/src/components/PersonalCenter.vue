<template>
  <div class="personal-center">
    <head-page></head-page>
    <div class="personal">
      <div class="personal-info">
        <div class="img"></div>
        <div class="set-up l">设置</div>
        <div class="sigin-out l" @click="userOut">退出账号</div>
      </div>
      <div class="right">
        <div class="first-enter">
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
      </div>
    </div>
    <div class="new-collections" v-if="createShow">
      <div class="alert" v-show="!siginOut">
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
      siginOut: false
    }
  },
  methods: {
    // 创建新收藏
    createNewItem () {
      this.createShow = true
      this.siginOut = false
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
  // border-right: 1px solid #ccc;
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
}
.new-collections {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
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
}
</style>
