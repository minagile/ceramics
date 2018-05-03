<template>
  <div class="two-level-page" id="two_level_page">
    <head-page></head-page>
    <div class="close" @click="close" ></div>
    <div class="img-detail" id="img_detail">
      <div class="collection" @click="collection($event)">收藏</div>
      <div class="img">
        <img :src="imgSrc" />
        <a class="cover" :href="imgHref" target="_blank"></a>
      </div>
    </div>
    <Enshrine v-if="isCollectionShow" :id="id" @enshrineClose="enshrineClose" @scroll.prevent @touchmove.prevent />
    <div class="img_list" id="item">
      <WaterFull :Images="imgs" :row="row" :picWidth="246" @maxHeight="maxHeight" @imgId="imgId" />
    </div>
    <div id="back_to_top" @click="backToTop">
      <img src="../assets/back_to_top.png" />
    </div>
  </div>
</template>

<script>
import HeadPage from './assembly/Header'
import Enshrine from './assembly/Enshrine'
import WaterFull from './assembly/WaterFull'
const PIC_WIDTH = 286
export default {
  name: 'twolevelpage',
  data () {
    return {
      imgSrc: '',
      data: '',
      isCollectionShow: false,
      row: 5,
      imgs: [],
      id: '',
      imgHref: '',
      levelHeight: 0
    }
  },
  mounted () {
    console.log('levelpage mounted')
    this.getData()
    document.getElementById('item').style.width = this.row * PIC_WIDTH - 20 + 'px'
    window.addEventListener('scroll', this.handleScroll)
    this.clientChange()
    window.addEventListener('resize', this.clientWidthChange)
  },
  methods: {
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
    clientChange () {
      let columnWidth = document.documentElement.clientWidth
      this.row = Math.floor(columnWidth / PIC_WIDTH)
      document.getElementById('item').style.width = this.row * PIC_WIDTH - 20 + 'px'
      if (this.row > 7) {
        this.row = 7
      } else if (this.row <= 1) {
        this.row = 1
      }
    },
    clientWidthChange () {
      this.clientChange()
    },
    handleScroll () {
      let scroll = document.documentElement.scrollTop || document.body.scrollTop
      let scrollH = document.documentElement.scrollHeight || document.body.scrollHeight
      let clientH = document.documentElement.clientHeight || document.body.clientHeight
      if (clientH + scroll === scrollH) {
        this.getData()
      }
      if (scroll >= clientH) {
        document.getElementById('back_to_top').style.bottom = '33px'
        document.getElementById('back_to_top').style.transition = '1s'
      } else {
        document.getElementById('back_to_top').style.bottom = '-50px'
        document.getElementById('back_to_top').style.transition = '1s'
      }
    },
    imgId (id) {
      this.id = id
      this.$router.go({name: 'TwoLevelPage', query: {id: id}})
    },
    maxHeight (data) {
      let h = document.getElementById('img_detail').offsetHeight
      this.levelHeight = data + h + 148 + 40
      document.getElementById('two_level_page').style.height = this.levelHeight + 'px'
    },
    collection (ev) {
      this.isCollectionShow = true
      let clientH = document.documentElement.clientHeight || document.body.clientHeight
      document.getElementById('two_level_page').style.height = clientH - 148 + 'px'
      document.getElementById('two_level_page').style.overflow = 'hidden'
    },
    enshrineClose (data) {
      this.isCollectionShow = data
      document.getElementById('two_level_page').style.overflow = ''
      document.getElementById('two_level_page').style.height = this.levelHeight + 'px'
    },
    getData () {
      let that = this
      this.id = this.$route.query.id
      that.$http.get('http://www.temaxd.com/Hooott/selCard.cz', {
        params: {
          id: this.id
        }
      }).then(res => {
        // console.log(JSON.parse(res.data).initializeImage)
        this.imgHref = JSON.parse(res.data).initializeImage
        this.imgSrc = 'https://spider-x.oss-cn-shanghai.aliyuncs.com/CeramicCard/' + JSON.parse(res.data).ossImage
      })
      that.$http.get('http://www.temaxd.com/Hooott/cardJson.cz').then(res => {
        JSON.parse(res.data).forEach(v => {
          let ImgSrc = 'https://spider-x.oss-cn-shanghai.aliyuncs.com/CeramicCard/' + v.ossImage.split('[')[1].split(']')[0]
          this.imgs.push({ossImage: ImgSrc, id: v.id})
        })
      })
    },
    close () {
      // this.$router.push({
      //   name: 'HomePage'
      // })
      let enter = JSON.parse(sessionStorage.getItem('enter'))
      console.log(enter)
      if (enter === true) {
        this.$router.push({
          name: 'PersonalCenter',
          params: {
            status: true
          }
        })
      } else {
        history.go(-1)
      }
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
    Enshrine,
    WaterFull
  }
}
</script>

<style lang="less" scoped>
.two-level-page {
  padding-top: 148px;
  position: relative;
  background: #ededed;
  min-height: 2000px;
  // overflow-y: scroll;
  .close {
    position: absolute;
    top: 130px;
    right: 90px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    background-image: url(../assets/close.png);
    background-size: cover;
    &:hover {
      // transform: scale(2);
      width: 25px;
      background-image: url(../assets/close1.png);
    }
  }
  .img-detail {
    width: 496px;
    // height: 717px;
    margin: 0 auto;
    background: #fff;
    border-radius: 15px;
    padding: 23px 0 40px 0;
    .collection {
      width: 80px;
      height: 40px;
      background: #e51c23;
      color: #fff;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
      border-radius: 4px;
      margin: 0 0 14px 376px;
      cursor: pointer;
      transition: 1s;
      &:hover {
        transition: 1s;
        background: #b81b20;
      }
    }
    .img {
      width: 415px;
      margin: 0 auto;
      position: relative;
      .cover {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transition: 1s;
        cursor: pointer;
        &:hover {
          transition: 1s;
          background: rgba(255, 255, 255, 0.7);
        }
      }
      img {
        width: 100%;
        display: block;
        border-radius: 8px;
      }
    }
  }
  .img_list {
    margin: 80px auto;
    position: relative;
    background: #ededed;
    height: auto;
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
    &:hover {
      transform: scale(1.2);
    }
    img {
      width: 100%;
    }
  }
}
</style>
