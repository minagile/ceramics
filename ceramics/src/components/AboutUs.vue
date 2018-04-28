<template>
  <div class="about-us">
    <head-page :item="hasToken"></head-page>
    <div class="body-page">
      <div class="tit">
        <router-link to="/">
          <img src="../assets/about_back.png" />
        </router-link>
        <span>返回首页</span>
      </div>
      <div class="swiper">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide><img src="../assets/pic1.jpg" /></swiper-slide>
          <swiper-slide><img src="../assets/pic2.jpg" /></swiper-slide>
          <swiper-slide><img src="../assets/pic3.jpg" /></swiper-slide>
          <swiper-slide><img src="../assets/pic4.jpg" /></swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
      <div class="words">
        <div class="cn_words">关 于 我 们</div>
        <div class="en_words">A B O U T   U S</div>
      </div>
      <div class="swipertwo">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide><img src="../assets/pic5.jpg" /></swiper-slide>
          <swiper-slide><img src="../assets/pic6.jpg" /></swiper-slide>
          <swiper-slide><img src="../assets/pic7.jpg" /></swiper-slide>
          <swiper-slide><img src="../assets/pic8.jpg" /></swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
      <div class="joy">乍见之欢 久看不厌</div>
      <div class="brief">
        <img src="../assets/pic9.jpg" />
        <div class="introduce">
          <h2>我 们 的 想 法</h2>
          <div class="big">我想仔细聆听故事，仔细地<br />创造一个围绕你我生活的陶瓷空间。</div>
          <div class="small">空间不需要特别的大，装得下你的喜欢就够。<br />她不是固定在某一个商铺，更不是固定在某一片土地。<br />里面围绕着的是一份对泥土的热爱，这份热爱，就如同每一次与自然的亲密接触，欣喜又平静。<br />我希望那份热爱，可以让外面的世界聆听到。<br />我想创造一个让我们都可以轻松交流和分享的平台。<br />这是我的愿望！</div>
          <div class="vertical">感谢生命让我遇见泥土<br />若你同样<br />心生欢喜<br />就停下脚步<br />和我一起<br />享受这一切</div>
          <div class="babel">HOOOT.T</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadPage from './assembly/Header'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
export default {
  name: 'aboutus',
  data () {
    return {
      hasToken: false,
      swiperOption: {
        // autoplay: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 3000,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      }
    }
  },
  mounted () {
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    HeadPage,
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less" scoped>
.about-us {
  padding-top: 80px;
  .body-page {
    padding-top: 70px;
    width: 1240px;
    margin: 0 auto;
    position: relative;
    .tit {
      margin: 30px 0;
      img {
        width: 30px;
        float: left;
        cursor: pointer;
      }
      span {
        line-height: 30px;
      }
    }
    .swiper {
      width: 880px;
      height: 400px;
      // border: 1px solid #ccc;
      .swiper-container {
        width: 880px;
        height: 400px;
        img {
          height: 100%;
          min-width: 100%;
        }
      }
    }
    .words {
      width: 58px;
      height: 150px;
      position: absolute;
      top: 200px;
      right: 130px;
      .en_words {
        display: flex;
        width: 20px;
        height: 100%;
        font-size: 15px;
        float: right;
        color: #666;
      }
      .cn_words {
        display: flex;
        width: 37px;
        height: 100%;
        font-size: 23px;
        float: left;
        line-height: 45px;
        align-items: center;
        color: #666;
      }
    }
    .swipertwo {
      width: 480px;
      height: 300px;
      position: absolute;
      right: 0;
      top: 400px;
      // border: 1px solid #ccc;
      .swiper-container {
        width: 480px;
        height: 300px;
        img {
          width: 100%;
        }
      }
    }
    .joy {
      width: 230px;
      font-size: 22px;
      line-height: 70px;
      color: #666;
      margin-left: 100px;
      margin-top: 40px;
      letter-spacing: 5px;
    }
    .brief {
      width: 100%;
      padding: 180px 0 130px 50px;
      overflow: hidden;
      img {
        padding-top: 70px;
        width: 374px;
        display: block;
        float: left;
      }
      .introduce {
        float: left;
        padding: 0 55px;
        width: 300px;
        min-height: 100px;
        color: #666;
        border-bottom: 1px solid #ccc;
        h2 {
          width: 160px;
          height: 25px;
          border: 1px solid #666;
          border-top: 0;
          font-size: 17px;
          color: #666;
          line-height: 5px;
          text-align: center;
          font-weight: 400;
          margin-left: 10px;
          margin-bottom: 30px;
        }
        .big {
          line-height: 26px;
          font-size: 18px;
          margin-bottom: 30px;
        }
        .small {
          line-height: 30px;
          font-size: 12px;
          margin-bottom: 40px;
        }
        .vertical {
          line-height: 30px;
          font-size: 12px;
        }
        .babel {
          text-align: right;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 110px;
        }
      }
    }
  }
}
</style>
