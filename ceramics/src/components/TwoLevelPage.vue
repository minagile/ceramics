<template>
  <div class="two-level-page">
    <img class="close" src="../assets/close.png" @click="close" />
    <div class="img-detail">
      <div class="collection">收藏</div>
      <img :src="imgSrc" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'twolevelpage',
  data () {
    return {
      imgSrc: '',
      data: ''
    }
  },
  mounted () {
    // console.log(this.$route.params.id)
    this.data = this.$route.params.scrollH
    this.getData()
  },
  methods: {
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
    },
    close () {
      this.$router.push({
        name: 'HomePage'
      })
      // history.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.two-level-page {
  padding-top: 68px;
  position: relative;
  background: #ededed;
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
}
</style>
