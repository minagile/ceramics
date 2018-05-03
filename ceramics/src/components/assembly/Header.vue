<template>
  <div class="head-page">
    <div class="menu">
      <div class="menu-img" @click="menuShow($event)"></div>
      <!-- <img src="../../assets/menu2.png" /> -->
      <div class="menu-list" v-show="isMenuShow">
        <span class="arrow"></span>
        <div class="cover">
          <div v-for="(item, index) in menuList" @click="link" :key="index"><router-link :to="item.link">{{ item.name }}</router-link></div>
        </div>
      </div>
    </div>
    <div class="title" @click="backToHome"><span>HOOOT.T</span></div>
    <div class="user">
      <!-- <div class="search">
        <input type="text" placeholder="" />
        <img src="../../assets/search.png" @click="searchShow($event)" />
      </div> -->
      <div class="userInfo" @click="personCenter"></div>
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
      isMenuShow: false,
      item: false
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
      // console.log(ev.path[1].children[1])
      this.isMenuShow = true
      // ev.path[1].children[1].style.display = 'block'
      if (ev.path[1].children[1].style.display === 'block') {
        ev.path[1].children[1].style.display = 'none'
      } else {
        ev.path[1].children[1].style.display = 'block'
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
  }
}
</script>

<style lang="less" scoped>
.head-page {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #bbb;
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 9;
  .menu {
    position: absolute;
    left: 0;
    top: 0;
    height: 80px;
    .menu-img {
      width: 30px;
      height: 30px;
      cursor: pointer;
      background-image: url('../../assets/menu3.png');
      background-size: cover;
      margin: 25px 0 0 25px;
      &:hover {
        background-image: url('../../assets/menu2.png');
      }
    }
    .menu-list {
      // display: none;
      width: 180px;
      // border: 1px solid #ccc;
      box-shadow: 0 0 5px #ccc;
      position: absolute;
      left: 25px;
      top: 70px;
      background: #fff;
      z-index: 9;
      .cover {
        position: relative;
        z-index: 99;
        height: 100%;
        width: 180px;
        background: #fff;
        div:last-of-type  a {
          border: 0;
        }
        div:hover {
          background: #eaeaea;
        }
      }
      .arrow {
        position: absolute;
        width: 14px;
        height: 14px;
        display: block;
        z-index: 1;
        // border-top: 1px solid #ccc;
        // border-left: 1px solid #ccc;
        box-shadow: 0 0 5px #ccc;
        transform: rotate(45deg);
        top: -9px;
        left: 4px;
      }
      div {
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        height: 40px;
        a {
          display: block;
          margin: 0 10px;
          border-bottom: 1px solid #ccc;
          text-decoration: none;
          color: #666;
        }
      }
    }
  }
  .title {
    text-align: center;
    line-height: 80px;
    font-size: 23px;
    font-weight: 800;
    letter-spacing: 3px;
    cursor: pointer;
    // &:hover {
    //   color: #666;
    // }
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
      width: 30px;
      height: 30px;
      cursor: pointer;
      background-image: url(../../assets/user.png);
      background-size: cover;
      &:hover {
        background-image: url(../../assets/person.png);
      }
    }
  }
}
</style>
