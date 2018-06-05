<template>
  <div class="home-page" id="home_page">
    <head-page :style="isScroll"></head-page>
    <div class="pic" id="banner" v-show="scrollShow">
      <div class="banner_cover">
        <h2>HOOOT.T</h2>
        <div class="p">
          <p>我想仔细聆听故事</p>
          <p>仔细地创造一个围绕你我生活的陶瓷空间。</p>
        </div>
      </div>
    </div>
    <div class="first-page" id="items" >
      <WaterFull :Images="data" :row="row" :picWidth="246" @notoken="notoken" />
    </div>
    <div id="back_to_top" @click="backToTop">
      <img src="../assets/back_to_top.png" />
    </div>
    <Register v-if="hasToken" @login="login"></Register>
  </div>
</template>

<script>
import HeadPage from './assembly/Header'
import TwoPageLevel from './assembly/TwoPageLevel'
import WaterFull from './assembly/WaterFull'
import Register from './assembly/Register.vue'
const PIC_WIDTH = 286
export default {
  name: 'homepage',
  data () {
    return {
      data: [],
      images: [],
      row: 5,
      time: 0,
      hasToken: false,
      isLevelShow: false,
      id: '',
      isScroll: { top: '-100px', transition: '1s' },
      scrollShow: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      window.addEventListener('resize', vm.clientWidthChange)
      window.addEventListener('scroll', vm.handleScroll)
    })
  },
  mounted () {
    this.clientChange()
    window.addEventListener('resize', this.clientWidthChange)
    document.getElementById('items').style.width = this.row * PIC_WIDTH - 20 + 'px'
    this.getData()
    window.addEventListener('scroll', this.handleScroll)
    let token = localStorage.getItem('token')
    if (token === null) {
      this.scrollShow = true
      this.isScroll = { top: '-100px', transition: '1s' }
    } else {
      this.scrollShow = false
      // this.getData()
      this.isScroll = { top: '0', transition: '1s' }
    }
  },
  methods: {
    notoken () {
      this.hasToken = true
    },
    login () {
      this.hasToken = false
    },
    backToTop () {
      var scrollToptimer = setInterval(function () {
        var top = document.body.scrollTop || document.documentElement.scrollTop
        var speed = top / 20
        if (document.body.scrollTop !== 0) {
          document.body.scrollTop -= speed
        } else {
          document.documentElement.scrollTop -= speed
        }
        if (top === 0) {
          clearInterval(scrollToptimer)
        }
      }, 40)
    },
    levelClose (data) {
      this.isLevelShow = data
    },
    handleScroll () {
      let scroll = document.documentElement.scrollTop || document.body.scrollTop
      let scrollH = document.documentElement.scrollHeight || document.body.scrollHeight
      let clientH = document.documentElement.clientHeight || document.body.clientHeight
      let token = localStorage.getItem('token')
      if (token === null) {
        this.isScroll = { top: '0', transition: '1s' }
        if (scroll === 0) {
          this.isScroll = { top: '-100px', transition: '1s' }
        }
      }
      if (scroll >= clientH) {
        document.getElementById('back_to_top').style.bottom = '33px'
        document.getElementById('back_to_top').style.transition = '1s'
      } else {
        document.getElementById('back_to_top').style.bottom = '-50px'
        document.getElementById('back_to_top').style.transition = '1s'
      }
      if (clientH + scroll === scrollH) {
        this.time++
        if (this.time >= 2) {
          let token = localStorage.getItem('token')
          if (token === null) {
            this.hasToken = true
          } else {
            this.hasToken = false
            this.getData()
          }
        } else {
          this.getData()
        }
      }
    },
    clientChange () {
      let columnWidth = document.documentElement.clientWidth
      let clientHeight = document.documentElement.clientHeight
      this.row = Math.floor(columnWidth / PIC_WIDTH)
      document.getElementById('items').style.width = this.row * PIC_WIDTH + 'px'
      document.getElementById('banner').style.height = clientHeight + 'px'
      if (this.row > 7) {
        this.row = 7
      } else if (this.row <= 1) {
        this.row = 1
      }
    },
    clientWidthChange () {
      this.clientChange()
    },
    getData () {
      let that = this
      that.$http.get('http://www.hooott.com/cardJson.cz').then(res => {
        JSON.parse(res.data).forEach(v => {
          let ImgSrc = 'https://spider-x.oss-cn-shanghai.aliyuncs.com/CeramicCard/' + v.ossImage.split('[')[1].split(']')[0]
          this.data.push({ossImage: ImgSrc, id: v.id})
        })
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.clientWidthChange)
    next()
  },
  components: {
    HeadPage,
    TwoPageLevel,
    WaterFull,
    Register
  }
}
</script>

<style lang="less" scoped>
// @font-face {
//   font-family: 'myFirstFont';
//   src: url(../assets/font/HYQiHei-30S.otf);
// }
.home-page {
  // padding-top: 120px;
  min-height: 2000px;
  .pic {
    width: 100%;
    background-image: url('../assets/home_pic.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    margin-bottom: 120px;
    position: relative;
    .banner_cover {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
      h2 {
        color: #fff;
        text-align: center;
        font-size: 50px;
        font-weight: 320;
        padding: 20px 0 0 0;
      }
      .p {
        position: absolute;
        top: 40%;
        width: 100%;
        p {
          color: #fff;
          text-align: center;
          font-size: 50px;
          // font-family: '汉仪旗黑';
          left: 184px;
          // font-family: 'myFirstFont';
          // font-weight: 320;
          // padding: 20px 0 0 0;
        }
      }
    }
  }
  .first-page {
    // width: 1200px;
    margin: 120px auto;
    position: relative;
    .popup {
      position: absolute;
      top: 0;
      width: 246px;
      padding: 10px;
      background: #eaeaea;
      margin: 10px;
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      &:hover .cover {
        transition: 1s;
        background: rgba(165, 244, 250, 0.4);
      }
      img {
        width: 246px;
        display: block;
        border-radius: 20px;
      }
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(165, 244, 250, 0);
        transition: 1s;
      }
    }
  }
  .two_level {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 80px;
    left: 0;
    background: #ededed;
    z-index: 999;
  }
  #back_to_top {
    width: 40px;
    height: 40px;
    position: fixed;
    z-index: 999999;
    bottom: -50px;
    right: 33px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    img {
      width: 100%;
    }
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
