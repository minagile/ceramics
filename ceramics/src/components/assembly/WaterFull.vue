<template>
  <div class="water-fall">
    <div class="popup" v-for="(item, index) in images" :key="index" ref="imgList">
      <div class="img" ref="img">
        <img :src="item.ossImage" />
      </div>
      <div class="cover" @click="imgLevel(item.id)"></div>
    </div>
  </div>
</template>

<script>
// const PIC_WIDTH = 286
export default {
  name: 'waterfall',
  data () {
    return {
      data: [],
      images: [],
      maxHeight: 0
    }
  },
  mounted () {
  },
  watch: {
    Images () {
      // console.log(this.Images)
      this.getData(this.Images)
    },
    row () {
      // console.log(this.row)
      this.getData(this.Images)
    }
  },
  methods: {
    imgLevel (id) {
      this.$emit('imgId', id)
      // console.log(id)
      this.$router.push({
        name: 'TwoLevelPage',
        query: {id: id}
      })
    },
    getData (data) {
      // console.log(data)
      this.images = data
      this.images.forEach((v, k) => {
        loadImage(v.ossImage).then(img => {
          this.$nextTick(() => {
            this.waterFull()
          })
        }).catch(err => console.log(err))
      })
    },
    waterFull () {
      let list = this.$refs.imgList
      // console.log(this.$refs.img)
      this.$refs.img.forEach(v => {
        // console.log(v.style)
        v.style.maxHeight = this.maxh + 'px'
      })
      let arr = []
      list.forEach((v, k) => {
        v.style.width = this.picWidth + 'px'
        if (k < this.row) {
          v.style.top = 0
          v.style.left = (this.picWidth + 40) * k + 'px'
          arr.push(v.offsetHeight)
        } else {
          let iMinH = Math.min(...arr)
          let iMinIndex = arr.indexOf(iMinH)
          v.style.left = iMinIndex * (this.picWidth + 40) + 'px'
          v.style.top = iMinH + 40 + 'px'
          arr[iMinIndex] = iMinH + v.offsetHeight + 40
          this.maxHeight = Math.max(...arr)
        }
      })
      this.$emit('maxHeight', this.maxHeight)
    }
  },
  props: {
    Images: {
      type: Array,
      default () {
        return []
      }
    },
    row: {
      type: Number,
      default () {
        return 5
      }
    },
    picWidth: {
      type: Number,
      default () {
        return 286
      }
    },
    maxh: {
      type: Number,
      default () {
        return 600
      }
    }
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
.water-fall {
  width: 100%;
  height: 100%;
  .popup {
    position: absolute;
    top: 0;
    width: 246px;
    // padding: 10px;
    // background: #eaeaea;
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    &:hover .cover {
      transition: 1s;
      background: rgba(255, 255, 255, 0.7);
    }
    .img {
      max-height: 600px;
      border-radius: 6px;
      overflow: hidden;
      img {
        width: 100%;
        display: block;
        border-radius: 6px;
      }
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
</style>
