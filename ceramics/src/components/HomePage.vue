<template>
  <div class="home-page" id="home_page">
    <head-page></head-page>
    <div class="first-page" id="items" >
      <!-- <WaterFull :Images="data" :row="row" :picWidth="246" @imgId="imgId" /> -->
      <WaterFull :Images="data" :row="row" :picWidth="246" @notoken="notoken" />
      <!-- <div class="popup" v-for="(item, index) in data" :key="index" ref="imgList">
        <img :src="'https://spider-x.oss-cn-shanghai.aliyuncs.com/CeramicCard/' + item.ossImage.split('[')[1].split(']')[0]" />
        <div class="cover" @click="imgLevel(item.id)"></div>
      </div> -->
    </div>
    <!-- <div class="two_level" v-if="isLevelShow">
      <TwoPageLevel :id="id" @levelClose="levelClose"/>
    </div> -->
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
      id: ''
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
  //   // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
  //   // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
  //   // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
  //   if (from.name === 'TwoLevelPage') {
  //     to.meta.isBack = true
  //   }
  //   next()
  // },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      window.addEventListener('resize', vm.clientWidthChange)
      window.addEventListener('scroll', vm.handleScroll)
    })
  },
  mounted () {
    // console.log('123213')
    this.clientChange()
    window.addEventListener('resize', this.clientWidthChange)
    document.getElementById('items').style.width = this.row * PIC_WIDTH - 20 + 'px'
    this.getData()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    notoken () {
      this.hasToken = true
    },
    login () {
      this.hasToken = false
    },
    backToTop () {
      // window.scrollTo(0, 0)
      var scrollToptimer = setInterval(function () {
        // console.log('定时循环回到顶部')
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
            // console.log('handleScroll')
            this.getData()
          }
        } else {
          this.getData()
          // console.log('handleScroll')
        }
      }
    },
    clientChange () {
      let columnWidth = document.documentElement.clientWidth
      this.row = Math.floor(columnWidth / PIC_WIDTH)
      document.getElementById('items').style.width = this.row * PIC_WIDTH + 'px'
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
      that.$http.get('http://www.temaxd.com/Hooott/cardJson.cz').then(res => {
        // console.log(res.data)
        // console.log(JSON.parse(res.data))
        JSON.parse(res.data).forEach(v => {
          let ImgSrc = 'https://spider-x.oss-cn-shanghai.aliyuncs.com/CeramicCard/' + v.ossImage.split('[')[1].split(']')[0]
          this.data.push({ossImage: ImgSrc, id: v.id})
        })
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    // console.log('leave')
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
.home-page {
  padding-top: 120px;
  min-height: 1000px;
  .first-page {
    // width: 1200px;
    margin: 0 auto;
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
  }
}
</style>
