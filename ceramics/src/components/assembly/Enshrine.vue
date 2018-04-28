<template>
  <div class="enshrine">
    <!-- 收藏 -->
    <div class="box">
      <div class="left">
        <div class="img">
          <img :src="imgSrc" />
        </div>
        <span class="has_collected" id="has_collected">{{ imgFolder }}</span>
      </div>
      <div class="right" v-if="isCreateShow">
        <div class="tit">
          <span>选择收藏夹</span>
          <img src="../../assets/close.png" @click="close" />
        </div>
        <div class="list">
          <div class="folder" v-for="(item, index) in collectionList" :key="index" @mouseenter="enter($event)" @mouseleave="leave($event)"  @click="collectImage(item.folderId)">
            <div class="img" :style="{'background-image': 'url(' + item.ossImage + ')'}" v-if="item.ossImage ? true : false"></div>
            <div class="img" :style="{'background-image': 'url(https://spider-x.oss-cn-shanghai.aliyuncs.com/CeramicCard/123268465508140855.jpg)'}" v-if="item.ossImage ? false : true"></div>
            <span>{{ item.folderName }}</span>
            <div class="collect">收藏</div>
          </div>
        </div>
        <div class="create" @click="create">
          <img src="../../assets/add.png" alt="">
          <span>创建新收藏</span>
        </div>
      </div>
      <div class="right r" v-if="!isCreateShow">
        <div class="tit">
          <span>创建新收藏</span>
          <img src="../../assets/close.png" @click="close" />
        </div>
        <div class="list">
          <h5>名称</h5>
          <input type="text" placeholder="输入名称" v-model="folderName" />
        </div>
        <div class="create">
          <button @click="cancle">取 消</button>
          <button @click="build">确 认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'enshrine',
  data () {
    return {
      collectionList: [],
      createShow: false,
      imgSrc: '',
      folderName: '',
      isCreateShow: true,
      imgFolder: ''
    }
  },
  mounted () {
    this.getData()
    this.getCollectionData()
  },
  methods: {
    // 收藏图片
    collectImage (id) {
      let that = this
      that.$http.get('http://www.temaxd.com/Hooott/folderCardExists.cz', {
        params: {
          userId: JSON.parse(localStorage.getItem('token')),
          cardId: this.id
        }
      }).then(res => {
        if (JSON.parse(res.data).CODE === '200') {
          // console.log(JSON.parse(res.data))
          let config = { emulateJSON: true }
          that.$http.post('http://www.temaxd.com/Hooott/saveFolderCard.cz', {
            ossImage: this.imgSrc,
            cardId: this.id,
            userId: JSON.parse(localStorage.getItem('token')),
            folderId: id
          }, config).then(res => {
            console.log(JSON.parse(res.data).CODE)
            if (JSON.parse(res.data).CODE === '200') {
              this.$emit('enshrineClose', false)
            }
          })
        } else if (JSON.parse(res.data).CODE === '403') {
          this.imgFolder = JSON.parse(res.data).MESSAGE
          // this.$emit('enshrineClose', false)
          document.getElementById('has_collected').style.color = 'red'
          // document.getElementById('has_collected').style.fontSize = '13px'
          // alert(JSON.parse(res.data).MESSAGE)
        }
      })
    },
    // 取消
    cancle () {
      this.isCreateShow = true
    },
    // 创建新收藏
    create () {
      this.isCreateShow = false
    },
    close () {
      this.$emit('enshrineClose', false)
    },
    // 鼠标进入
    enter (ev) {
      ev.path[0].children[2].style.display = 'block'
    },
    leave (ev) {
      ev.path[0].children[2].style.display = 'none'
    },
    // 获取图片信息
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
      that.$http.get('http://www.temaxd.com/Hooott/folderCardExists.cz', {
        params: {
          userId: JSON.parse(localStorage.getItem('token')),
          cardId: this.id
        }
      }).then(res => {
        // console.log(res.data)
        if (JSON.parse(res.data).CODE === '403') {
          this.imgFolder = JSON.parse(res.data).MESSAGE
        }
      })
    },
    // 收藏夹
    getCollectionData () {
      let that = this
      that.$http.get('http://www.temaxd.com/Hooott/folderUserAll.cz', {
        params: {
          userId: JSON.parse(localStorage.getItem('token'))
        }
      }).then(res => {
        // console.log(res.data)
        let list = res.data.split('[')[1].split(']')[0]
        if (list.indexOf(',') === -1) {
          this.collectionList.push(JSON.parse(list))
          that.$http.get('http://www.temaxd.com/Hooott/folderCardAll.cz', {
            params: {
              folderId: JSON.parse(list).folderId
            }
          }).then(res => {
            // 没有收藏图片
            if (res.data.indexOf('[') === -1) {
              let item = {
                folderName: JSON.parse(list).folderName,
                folderId: JSON.parse(list).folderId,
                ossImage: null
              }
              this.collectionList.push(item)
            } else {
              let folderImg = res.data.split('[')[1].split(']')[0]
              if (folderImg.indexOf(', {') === -1) {
                let item = {
                  folderName: JSON.parse(list).folderName,
                  folderId: JSON.parse(list).folderId,
                  ossImage: JSON.parse(folderImg).ossImage
                }
                this.collectionList.push(item)
              } else {
                folderImg.split(', {').forEach((m, n) => {
                  if (n === 0) {
                    let item = {
                      folderName: JSON.parse(list).folderName,
                      folderId: JSON.parse(list).folderId,
                      ossImage: JSON.parse(m).ossImage
                    }
                    this.collectionList.push(item)
                  }
                })
              }
            }
          })
        } else {
          list.split(', {').map((v, k) => {
            if (k !== 0) {
              v = '{' + v
            }
            that.$http.get('http://www.temaxd.com/Hooott/folderCardAll.cz', {
              params: {
                folderId: JSON.parse(v).folderId
              }
            }).then(res => {
              if (res.data.indexOf('[') === -1) {
                let item = {
                  folderName: JSON.parse(v).folderName,
                  folderId: JSON.parse(v).folderId,
                  ossImage: null
                }
                // console.log(k)
                this.collectionList.push(item)
              } else {
                let folderImg = res.data.split('[')[1].split(']')[0]
                if (folderImg.indexOf(', {') === -1) {
                  let item = {
                    folderName: JSON.parse(v).folderName,
                    folderId: JSON.parse(v).folderId,
                    ossImage: JSON.parse(folderImg).ossImage
                  }
                  // console.log(k)
                  this.collectionList.push(item)
                } else {
                  folderImg.split(', {').forEach((m, n) => {
                    if (n === 0) {
                      let item = {
                        folderName: JSON.parse(v).folderName,
                        folderId: JSON.parse(v).folderId,
                        ossImage: JSON.parse(m).ossImage
                      }
                      // console.log(k)
                      this.collectionList.push(item)
                    }
                  })
                }
              }
            })
          })
        }
        // console.log(this.collectionList)
      }).catch(err => {
        console.log(err)
      })
    },
    // 创建收藏夹
    build () {
      let that = this
      // 判断图片是否已收藏
      that.$http.get('http://www.temaxd.com/Hooott/folderCardExists.cz', {
        params: {
          userId: JSON.parse(localStorage.getItem('token')),
          cardId: this.id
        }
      }).then(res => {
        // 图片未收藏则将文件传入此文件夹
        if (JSON.parse(res.data).CODE === '200') {
          that.$http.get('http://www.temaxd.com/Hooott/addFolder.cz', {
            params: {
              userId: JSON.parse(localStorage.getItem('token')),
              folderName: this.folderName
            }
          }).then(res => {
            // console.log(JSON.parse(res.data))
            if (JSON.parse(res.data).CODE === '200') {
              this.collectionList = []
              this.getCollectionData()
              this.folderName = ''
              this.isCreateShow = true
              let config = { emulateJSON: true }
              that.$http.post('http://www.temaxd.com/Hooott/saveFolderCard.cz', {
                ossImage: this.imgSrc,
                cardId: this.id,
                userId: JSON.parse(localStorage.getItem('token')),
                folderId: JSON.parse(res.data).folderId
              }, config).then(res => {
                // console.log(JSON.parse(res.data).CODE)
                if (JSON.parse(res.data).CODE === '200') {
                  this.$emit('enshrineClose', false)
                }
              })
            }
            if (JSON.parse(res.data).CODE === '403') {
              alert(JSON.parse(res.data).MESSAGE)
            }
          })
        } else if (JSON.parse(res.data).CODE === '403') {
          // this.imgFolder = JSON.parse(res.data).MESSAGE
          that.$http.get('http://www.temaxd.com/Hooott/addFolder.cz', {
            params: {
              userId: JSON.parse(localStorage.getItem('token')),
              folderName: this.folderName
            }
          }).then(res => {
            if (JSON.parse(res.data).CODE === '200') {
              this.collectionList = []
              this.getCollectionData()
              this.folderName = ''
              this.$emit('enshrineClose', false)
            }
          })
        }
      })
    }
  },
  props: {
    id: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.enshrine {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(23, 23, 23, 0.5);
  top: 0;
  left: 0;
  z-index: 999;
  .box {
    width: 668px;
    height: 610px;
    background: #fff;
    border-radius: 10px;
    margin: 230px auto;
    .left {
      width: 334px;
      height: 100%;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #ccc;
      flex-direction: column;
      .has_collected {
        font-size: 12px;
        color: #ccc;
        letter-spacing: 2px;
        padding-top: 8px;
      }
      .img {
        width: 220px;
        border-radius: 8px;
        max-height: 400px;
        overflow: hidden;
        img {
          width: 100%;
          border-radius: 8px;
          display: block;
        }
      }
    }
    .right {
      width: 333px;
      height: 100%;
      float: left;
      .tit {
        height: 50px;
        border-bottom: 1px solid #ccc;
        position: relative;
        span {
          font-size: 22px;
          color: #666;
          padding-left: 16px;
          line-height: 60px;
        }
        img {
          position: absolute;
          top: 17px;
          right: 13px;
          width: 23px;
          cursor: pointer;
        }
      }
      .list {
        height: 503px;
        padding: 5px 0 0;
        overflow-y: scroll;
        .folder {
          height: 37px;
          cursor: pointer;
          padding: 8px 24px;
          // transition: 1s;
          background: #fff;
          &:hover {
            // transition: 1s;
            background: #eaeaea;
          }
          .img {
            width: 37px;
            height: 37px;
            background-size: cover;
            border-radius: 4px;
            margin-right: 16px;
            float: left;
          }
          span {
            float: left;
            line-height: 37px;
            color: #6b6b6b;
            font-size: 16px;
            font-weight: 700;
          }
          .collect {
            display: none;
            float: right;
            width: 43px;
            height: 23px;
            line-height: 23px;
            margin-top: 8px;
            border-radius: 4px;
            color: #fff;
            background: #e51c23;
            font-size: 10px;
            text-align: center;
          }
        }
      }
      .create {
        width: 100%;
        height: 50px;
        border-top: 1px solid #ccc;
        cursor: pointer;
        button {
          height: 40px;
          width: 50px;
          background: #ededed;
          color: #737373;
          border: 0;
          font-size: 14px;
          // text-align: right;
          // letter-spacing: 3px;
          border-radius: 4px;
          margin: 20px 36px 0 23px;
          cursor: pointer;
          outline: none;
          &:nth-of-type(2) {
            float: right;
          }
        }
        img {
          margin: 9px 15px 0 16px;
          float: left;
          cursor: pointer;
        }
        span {
          line-height: 50px;
          color: #666;
          font-size: 16px;
        }
      }
      img {
        width: 30px;
      }
    }
    .r {
      .list {
        padding: 7px 24px 0;
        height: 460px;
        h5 {
          line-height: 23px;
          font-size: 15px;
          color: #969696;
          font-weight: 400;
          padding: 10px 0 10px 0;
        }
        input {
          width: 265px;
          height: 39px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          color: rgb(121, 121, 121);
          // font-weight: 600;
          text-indent: 10px;
          outline: none;
        }
      }
    }
  }
}
</style>
