<template>
  <div class="home-page">
    <head-page :item="hasToken"></head-page>
    <div class="first-page" id="items" >
      <div class="popup" v-for="(item, index) in data" :key="index" ref="imgList">
        <img :src="'https://spider-x.oss-cn-shanghai.aliyuncs.com/CeramicCard/' + item.ossImage.split('[')[1].split(']')[0]" />
        <div class="cover"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadPage from './assembly/Header'
const PIC_WIDTH = 286
export default {
  name: 'homepage',
  data () {
    return {
      data: [],
      images: [],
      row: 5,
      time: 0,
      hasToken: false
    }
  },
  mounted () {
    this.clientChange()
    window.addEventListener('resize', this.clientWidthChange)
    document.getElementById('items').style.width = this.row * PIC_WIDTH + 'px'
    this.getData()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      let scroll = document.documentElement.scrollTop || document.body.scrollTop
      let scrollH = document.documentElement.scrollHeight || document.body.scrollHeight
      let clientH = document.documentElement.clientHeight || document.body.clientHeight
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
      this.row = Math.floor(columnWidth / PIC_WIDTH)
      document.getElementById('items').style.width = this.row * PIC_WIDTH + 'px'
      if (this.row > 7) {
        this.row = 7
      } else if (this.row <= 1) {
        this.row = 1
      }
      this.getData()
    },
    clientWidthChange () {
      this.clientChange()
    },
    waterFull () {
      let list = this.$refs.imgList
      let arr = []
      list.forEach((v, k) => {
        if (k < this.row) {
          v.style.top = 0
          v.style.left = PIC_WIDTH * k + 'px'
          arr.push(v.offsetHeight)
        } else {
          let iMinH = Math.min(...arr)
          let iMinIndex = arr.indexOf(iMinH)
          v.style.left = iMinIndex * PIC_WIDTH + 'px'
          v.style.top = iMinH + 20 + 'px'
          arr[iMinIndex] = iMinH + v.offsetHeight + 20
        }
      })
    },
    getData () {
      let that = this
      that.$http.get('http://www.temaxd.com/Hooott/cardJson.cz').then(res => {
        JSON.parse(res.data).forEach(v => {
          this.data.push(v)
        })
        this.data.forEach((v, k) => {
          let ImgSrc = 'https://spider-x.oss-cn-shanghai.aliyuncs.com/CeramicCard/' + v.ossImage.split('[')[1].split(']')[0]
          // 预加载
          loadImage(ImgSrc).then(img => {
            // this.images.push(img)
            this.$nextTick(() => {
              this.waterFull()
            })
          }).catch(err => console.log(err))
        })
      })
    }
  },
  components: {
    HeadPage
  }
}
// 预加载图片
function loadImage (url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}
</script>

<style lang="less" scoped>
.home-page {
  padding-top: 80px;
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
}
</style>
