<template>
  <div class="head-page">
    <div class="menu">
      <img src="../../assets/menu.png" @click="menuShow($event)" />
      <div class="menu-list" v-show="isMenuShow">
        <span class="arrow"></span>
        <div v-for="(item, index) in menuList" @click="link" :key="index"><router-link :to="item.link">{{ item.name }}</router-link></div>
      </div>
    </div>
    <div class="title" @click="backToHome"><span>HOOOT.T</span></div>
    <div class="user">
      <div class="search">
        <input type="text" placeholder="" />
        <img src="../../assets/search.png" @click="searchShow($event)" />
      </div>
      <img class="userInfo" src="../../assets/user.png" @click="personCenter" />
    </div>
    <Register v-if="item" @login="login"></Register>
  </div>
</template>

<script>
import Register from '../assembly/Register.vue'
export default {
  name: 'headpage',
  data () {
    return {
      menuList: [{name: '关于我们', link: '/aboutus'}, {name: '服务条款', link: '/serverterms'}],
      isMenuShow: false
    }
  },
  methods: {
    link () {
      this.isMenuShow = false
    },
    login () {
      this.item = false
    },
    backToHome () {
      this.$router.push('/')
      this.isMenuShow = false
    },
    personCenter () {
      this.isMenuShow = false
      let token = JSON.parse(localStorage.getItem('token'))
      if (token === null) {
        this.item = true
      } else {
        this.$router.push('/PersonalCenter')
      }
    },
    menuShow (ev) {
      this.isMenuShow = true
      if (ev.path[1].children[1].style.display === 'none' || ev.path[1].children[1].style.display === '') {
        ev.path[1].children[1].style.display = 'block'
      } else {
        ev.path[1].children[1].style.display = 'none'
      }
    },
    // 搜索框弹出与隐藏
    searchShow (ev) {
      if (ev.path[1].children[0].style.width === '') {
        ev.path[1].children[0].style.width = '140px'
        ev.path[1].style.background = 'rgba(240,240,240,1)'
        ev.path[1].children[0].style.transition = 'width 1s'
        ev.path[1].style.transition = 'background 1s'
        ev.path[1].children[0].focus()
      } else {
        ev.path[1].children[0].style.width = ''
        ev.path[1].style.background = 'rgba(240,240,240,0)'
        ev.path[1].children[0].style.transition = 'all 1s'
        ev.path[1].style.transition = 'background 1s'
      }
    }
  },
  components: {
    Register
  },
  props: {
    item: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.head-page {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #666;
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 9;
  img {
    width: 30px;
    cursor: pointer;
  }
  .menu {
    position: absolute;
    left: 0;
    top: 0;
    height: 80px;
    .menu-list {
      display: none;
      width: 160px;
      padding: 0 10px;
      border: 1px solid #ccc;
      position: absolute;
      left: 25px;
      top: 70px;
      background: #fff;
      .arrow {
        position: absolute;
        width: 14px;
        height: 14px;
        display: block;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        transform: rotate(45deg);
        top: -9px;
        left: 4px;
      }
      div {
        height: 40px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        &:last-of-type{
          border: 0;
        }
        a {
          text-decoration: none;
          color: #666;
        }
      }
    }
    img {
      display: block;
      margin: 25px 0 0 25px;
    }
  }
  .title {
    text-align: center;
    line-height: 80px;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 3px;
    span {
      cursor: pointer;
    }
  }
  .user {
    position: absolute;
    right: 33px;
    top: 0;
    height: 80px;
    .search {
      float: left;
      margin-top: 25px;
      border-radius: 20px;
      img {
        cursor: pointer;
      }
      input {
        outline: none;
        display: block;
        float: left;
        width: 0;
        height: 25px;
        border-radius: 4px;
        border: 0;
        background: rgba(0,0,0,0);
        border: 1px solid #ccc;
        border-color: rgba(0,0,0,0);
        padding-left: 20px;
        margin-right: 10px;
        margin-top: 2px;
        caret-color: #999;
      }
    }
    .userInfo {
      float: right;
      margin-top: 25px;
      display: block;
    }
  }
}
</style>
