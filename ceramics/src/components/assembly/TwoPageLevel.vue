<template>
  <div class="two-page-level">
    <img class="close" src="../../assets/close.png" @click="close" />
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
import Enshrine from './Enshrine'
import WaterFull from './WaterFull'
export default {
  name: 'twopagelevel',
  data () {
    return {
      imgSrc: '',
      data: '',
      isCollectionShow: false,
      row: 5,
      imgs: []
    }
  },
  mounted () {
    this.getData()
    document.getElementById('item').style.width = this.row * 286 + 'px'
  },
  methods: {
    // imgId (data) {
    //   this.id = data
    //   this.getData()
    // },
    enshrineClose (data) {
      this.isCollectionShow = data
    },
    collection () {
      this.isCollectionShow = true
    },
    getData () {
      let that = this
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
      this.$emit('levelClose', false)
    }
  },
  props: {
    id: {
      type: String,
      default () {
        return ''
      }
    }
  },
  components: {
    Enshrine,
    WaterFull
  }
}
</script>

<style lang="less" scoped>
.two-page-level {
  padding-top: 68px;
  position: relative;
  height: 87%;
  width: 100%;
  overflow-y: scroll;
  .close {
    position: absolute;
    top: 50px;
    right: 90px;
    width: 43px;
    display: block;
    cursor: pointer;
  }
  .img-detail {
    width: 496px;
    // height: 717px;
    margin: 0 auto 56px;
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
    margin: 20px auto;
    position: relative;
  }
}
</style>
