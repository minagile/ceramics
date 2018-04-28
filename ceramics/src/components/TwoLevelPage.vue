<template>
  <div class="two-level-page" id="two_level_page">
    <head-page></head-page>
    <img class="close" src="../assets/close.png" @click="close" />
    <div class="img-detail" id="img_detail">
      <div class="collection" @click="collection">收藏</div>
      <img :src="imgSrc" />
    </div>
    <Enshrine v-if="isCollectionShow" :id="id" @enshrineClose="enshrineClose" />
    <div class="img_list" id="item">
      <WaterFull :Images="imgs" :row="row" :picWidth="246" @maxHeight="maxHeight" @imgId="imgId" />
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
      id: ''
    }
  },
  mounted () {
    this.getData()
    document.getElementById('item').style.width = this.row * PIC_WIDTH + 'px'
    window.addEventListener('scroll', this.handleScroll)
    this.clientChange()
    window.addEventListener('resize', this.clientWidthChange)
  },
  methods: {
    clientChange () {
      let columnWidth = document.documentElement.clientWidth
      this.row = Math.floor(columnWidth / PIC_WIDTH)
      document.getElementById('item').style.width = this.row * PIC_WIDTH + 'px'
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
    },
    imgId (id) {
      this.id = id
      this.$router.go({name: 'TwoLevelPage', query: {id: id}})
    },
    maxHeight (data) {
      let h = document.getElementById('img_detail').offsetHeight
      document.getElementById('two_level_page').style.height = data + h + 148 + 40 + 'px'
    },
    collection () {
      this.isCollectionShow = true
    },
    enshrineClose (data) {
      this.isCollectionShow = data
    },
    getData () {
      let that = this
      this.id = this.$route.query.id
      that.$http.get('http://www.temaxd.com/Hooott/selCard.cz', {
        params: {
          id: this.id
        }
      }).then(res => {
        // console.log(JSON.parse(res.data))
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
      history.go(-1)
    }
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
  .close {
    position: absolute;
    top: 130px;
    right: 90px;
    width: 43px;
    display: block;
    cursor: pointer;
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
    }
    img {
      width: 415px;
      margin: 0 auto;
      display: block;
      border-radius: 8px;
    }
  }
  .img_list {
    margin: 80px auto;
    position: relative;
    background: #ededed;
    height: auto;
  }
}
</style>
