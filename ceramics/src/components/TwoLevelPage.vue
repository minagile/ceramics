<template>
  <div class="two-level-page">
    <head-page></head-page>
    <img class="close" src="../assets/close.png" @click="close" />
    <div class="img-detail">
      <div class="collection" @click="collection">收藏</div>
      <img :src="imgSrc" alt="">
    </div>
    <Enshrine v-if="isCollectionShow" :id="id" @enshrineClose="enshrineClose" />
    <div class="img_list" id="item">
      <WaterFull :Images="imgs" :row="row" :picWidth="246" />
    </div>
  </div>
</template>

<script>
import HeadPage from './assembly/Header'
import Enshrine from './assembly/Enshrine'
import WaterFull from './assembly/WaterFull'
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
    // console.log(this.$route.params.id)
    this.id = this.$route.params.id
    // this.data = this.$route.params.scrollH
    this.getData()
    document.getElementById('item').style.width = this.row * 286 + 'px'
  },
  methods: {
    collection () {
      this.isCollectionShow = true
    },
    enshrineClose (data) {
      this.isCollectionShow = data
    },
    getData () {
      let that = this
      that.$http.get('http://www.temaxd.com/Hooott/selCard.cz', {
        params: {
          id: this.$route.params.id
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
    border-radius: 18px;
    padding: 23px 0 36px 0;
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
