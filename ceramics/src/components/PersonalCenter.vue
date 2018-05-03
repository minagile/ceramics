<template>
  <div class="personal-center">
    <head-page></head-page>
    <div class="personal">
      <div class="back_to_homepage">
        <router-link to="/">
          <img src="../assets/back.png" alt="">
          <span>返回首页</span>
        </router-link>
      </div>
      <div class="personal-info">
        <div class="img">
          <img  :src="avatar" />
          <input type="file"
            name="avatar"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            @change="changeImage($event)"
            ref="avatarInput" />
        </div>
        <div class="set-up l" @click="setUp">设置</div>
        <div class="sigin-out l" @click="userOut">退出账号</div>
      </div>
      <div class="right" id="big_box">
        <!-- 文件夹 -->
        <div class="first-enter" id="first_enter" v-if="!isSetUpShow" v-show="!isPictureShow">
          <div class="create-new r">
            <div class="pic" @click="createNewItem">
              <img src="../assets/add.png" alt="">
            </div>
            <span>创建新收藏</span>
          </div>
          <div class="folder r" v-for="(item, index) in collectionList" :key="index" @click="showFolderImages(item.folderId, item.folderName)">
            <div class="pic" :style="{'background-image': 'url(' + item.ossImage + ')'}" v-if="item.ossImage ? true : false"></div>
            <!-- <div class="pic" v-if="item.ossImage ? true : false" ref="picImagesList">
              <img v-for="(data, index) in item.list" :key="index" :src="data.ossImage" />
            </div> -->
            <div class="pic" :style="{'background-image': 'url(https://spider-x.oss-cn-shanghai.aliyuncs.com/CeramicCard/123268465508140855.jpg)'}" v-if="item.ossImage ? false : true"></div>
            <span>{{ item.folderName }}</span>
            <div class="cover"></div>
          </div>
        </div>
        <!-- 收藏夹中的图片 -->
        <div class="images" id="collection_imgs" v-show="isPictureShow">
          <div class="name">
            <img src="../assets/back.png" alt="" @click="back">
            {{ foldName }}
          </div>
          <div id="list_item" class="img-list">
            <WaterFull :Images="imgList" :row="row" :picWidth="200" :maxh="500" @maxHeight="calculateHeight" />
          </div>
        </div>
        <!-- 个人设置 -->
        <div class="set-up-show" v-show="isSetUpShow">
          <div class="border"></div>
          <h2>账户修改</h2>
          <div class="modify">
            <div class="tit">电子邮箱</div>
            <div class="email">
              <input type="email" placeholder="Email" v-model="email" />
              <!-- 发送验证码 -->
              <!-- <img src="../assets/send.png" @click="sendCode" /> -->
              <div class="img" @click="sendCode"></div>
              <input type="text" class="codeBox" id="email_code" placeholder="填写验证码" v-model="correctCode" />
            </div>
            <div class="tit">手机号</div>
            <div class="nickname">
              <input type="text" placeholder="手机号" v-model="nickname" />
              <!-- 发送验证码 -->
              <!-- <img src="../assets/send.png" @click="" /> -->
              <div class="img" @click="sendPhoneCode"></div>
              <input type="text" class="codeBox" id="name_code" placeholder="填写验证码" v-model="correctPhoneCode" />
            </div>
            <div class="tit">密码</div>
            <div class="password"><button @click="changePassword">更改密码</button></div>
            <div class="tit">性别</div>
            <div class="sex" @change="sexChange($event)" id="sex">
              <input type="radio" name="sex" v-model="sex" value="男" />男
              <input type="radio" name="sex" v-model="sex" value="女" />女
            </div>
            <div class="tit">头像</div>
            <div class="head-portrait">
              <img :src="avatar" />
              <button>
                <input type="file"
                name="avatar"
                accept="image/gif,image/jpeg,image/jpg,image/png"
                @change="changeImage($event)"
                ref="avatarInput" />更换头像
              </button>
            </div>
          </div>
          <div class="save" @click="saveChange">保存修改</div>
        </div>
      </div>
    </div>
    <div class="new-collections" v-if="createShow">
      <!-- 创建新收藏 -->
      <div class="alert" v-show="newCollection">
        <h2>创建新收藏</h2>
        <div class="name">
          <span>名称</span>
          <input type="text" placeholder="输入名称" v-model="folderName" />
        </div>
        <div class="cancel">
          <button @click="build">创建</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
      <!-- 退出账号 -->
      <div class="alert" v-show="siginOut">
        <h2>退出账号</h2>
        <div class="name">
          <span>确认退出当前帐号</span>
        </div>
        <div class="cancel">
          <button @click="signout">退出</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
      <!-- 忘记密码 -->
      <div class="alert change_password" v-show="isChangePass">
        <h3>更改密码</h3>
        <img src="../assets/close.png" @click="cancel" />
        <div class="alter">
          <div class="code">旧密码</div>
          <input type="password" placeholder="单行输入" v-model="oldPw" />
          <div class="forget" @click="forgot">忘记密码？</div>
        </div>
        <div class="alter">
          <div class="code">新密码</div>
          <input type="password" placeholder="单行输入" v-model="newPw" />
        </div>
        <div class="alter">
          <div class="code">确认密码</div>
          <input type="password" placeholder="单行输入" v-model="confirmPw" />
        </div>
        <div class="cancel">
          <button @click="confirmChange">确认</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
    </div>
    <div class="forget_pw" v-if="isForgetShow">
      <ForgetPassword />
    </div>
  </div>
</template>

<script>
import HeadPage from './assembly/Header'
import ForgetPassword from './assembly/ForgetPassword'
import WaterFull from './assembly/WaterFull'
export default {
  name: 'personalcenter',
  data () {
    return {
      createShow: false,
      siginOut: false,
      isSetUpShow: false,
      newCollection: false,
      isChangePass: false,
      oldPw: '',
      newPw: '',
      confirmPw: '',
      isForgetShow: false,
      avatar: '',
      user: '',
      collectionList: [],
      folderName: '',
      isPictureShow: false,
      foldName: '',
      imgList: [],
      row: 3,
      email: '',
      nickname: '',
      sex: '男',
      correctCode: '',
      getCode: '',
      correctPhoneCode: '',
      getPhoneCode: ''
    }
  },
  mounted () {
    // console.log(this.$route.params.status)
    if (this.$route.params.status === true) {
      this.isPictureShow = true
      this.foldName = JSON.parse(sessionStorage.getItem('data')).foldName
      this.imgList = JSON.parse(sessionStorage.getItem('data')).imgList
    }
    this.getInfoData()
    this.getCollectionData()
    window.addEventListener('resize', this.clientWidthChange)
    // how many rows
    let columnWidth = document.documentElement.clientWidth
    let WaterFullRow = Math.floor((columnWidth - 500) / 221)
    // console.log(WaterFullRow)
    this.row = WaterFullRow
    document.getElementById('list_item').style.width = this.row * 221 + 'px'
    let foldNum = Math.floor((columnWidth - 372) / 302)
    if (columnWidth - 372 > 906) {
      document.getElementById('big_box').style.width = columnWidth - 372 + 'px'
      document.getElementById('first_enter').style.width = foldNum * 302 + 'px'
    } else {
      document.getElementById('big_box').style.width = 990 + 'px'
      document.getElementById('first_enter').style.width = 906 + 'px'
    }
  },
  methods: {
    calculateHeight (data) {
      document.getElementById('collection_imgs').style.height = data + 60 + 'px'
    },
    clientWidthChange () {
      let columnWidth = document.documentElement.clientWidth
      let foldNum = Math.floor((columnWidth - 372) / 302)
      let WaterFullRow = Math.floor((columnWidth - 428) / 221)
      // console.log(WaterFullRow)
      if (WaterFullRow < 3) {
        WaterFullRow = 3
      }
      this.row = WaterFullRow
      document.getElementById('list_item').style.width = this.row * 221 + 'px'
      if (columnWidth - 372 >= 906) {
        document.getElementById('big_box').style.width = columnWidth - 372 + 'px'
        document.getElementById('first_enter').style.width = foldNum * 302 + 'px'
      } else {
        document.getElementById('big_box').style.width = 990 + 'px'
        document.getElementById('first_enter').style.width = 906 + 'px'
      }
    },
    // 发送验证码
    sendCode () {
      document.getElementById('email_code').style.width = '100px'
      document.getElementById('email_code').style.transition = '0.5s'
      let that = this
      let config = { headers: { 'Content-Type': 'multipart/form-data' } }
      if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))) {
        alert('邮箱有误，请重填')
      } else {
        that.$http.post('http://www.temaxd.com/Hooott/sendEmail.cz?email=' + this.email, {}, config).then(res => {
          let status = JSON.parse(res.data)
          console.log(status[1].RAND)
          this.getCode = status[1].RAND
        })
      }
    },
    sendPhoneCode () {
      document.getElementById('name_code').style.width = '100px'
      document.getElementById('name_code').style.transition = '0.5s'
      let that = this
      let config = { headers: { 'Content-Type': 'multipart/form-data' } }
      if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.nickname))) {
        alert('手机号码有误，请重填')
      } else {
        that.$http.post('http://www.temaxd.com/Hooott/sendPhone.cz?phone=' + this.nickname, {}, config).then(res => {
          let status = JSON.parse(res.data)
          console.log(status)
          this.getPhoneCode = status.RAND
        })
      }
    },
    // 修改性别
    sexChange (ev) {
      this.sex = ev.path[0].value
    },
    // 保存修改设置
    saveChange () {
      if (this.email === 'null') {
        this.email = 0
      } else {
        this.email = this.email
      }
      if (this.nickname === 'null') {
        this.nickname = 0
      } else {
        this.nickname = this.nickname
      }
      if (this.email !== this.user.userEmail) {
        if (this.correctCode === '' || this.correctCode !== this.getCode) {
          alert('请填写正确的验证码')
        } else {
          if (this.nickname !== this.user.userPhone) {
            if (this.getPhoneCode !== this.correctPhoneCode || this.correctPhoneCode === '') {
              alert('请填写正确的验证码')
            } else {
              this.changeUserInfo()
            }
          } else {
            if (this.sex !== this.user.userSex) {
              this.changeUserInfo()
            } else {
              // history.go(0)
              this.changeUserInfo()
            }
          }
        }
      } else {
        if (this.nickname !== this.user.userPhone) {
          if (this.getPhoneCode !== this.correctPhoneCode || this.correctPhoneCode === '') {
            alert('请填写正确的验证码')
          } else {
            this.changeUserInfo()
          }
        } else {
          if (this.sex !== this.user.userSex) {
            this.changeUserInfo()
          } else {
            // history.go(0)
            this.changeUserInfo()
          }
        }
      }
    },
    changeUserInfo () {
      let that = this
      let config = { emulateJSON: true }
      console.log(this.email)
      that.$http.post('http://www.temaxd.com/Hooott/updateUserInfo.cz', {
        userEmail: this.email,
        userPhone: this.nickname,
        userSex: this.sex,
        userId: JSON.parse(localStorage.getItem('token'))
      }, config).then(res => {
        console.log(res.data)
        history.go(0)
      })
    },
    back () {
      this.isPictureShow = false
      sessionStorage.setItem('enter', false)
    },
    // 展示文件夹里的图片
    showFolderImages (id, name) {
      sessionStorage.setItem('enter', true)
      this.isPictureShow = true
      this.imgList = []
      this.foldName = name
      let that = this
      that.$http.get('http://www.temaxd.com/Hooott/folderCardAll.cz', {
        params: {
          folderId: id
        }
      }).then(res => {
        // console.log(res.data.split('[')[1].split(']')[0].split(', {'))
        let list = res.data.split('[')[1].split(']')[0]
        if (list.indexOf(', {') === -1) {
          this.imgList.push({ossImage: JSON.parse(list).ossImage, id: JSON.parse(list).cardId})
        } else {
          list.split(', {').forEach((v, k) => {
            if (k !== 0) {
              v = '{' + v
            }
            // console.log(v)
            this.imgList.push({ossImage: JSON.parse(v).ossImage, id: JSON.parse(v).cardId})
          })
          // console.log(this.imgList)
          let data = {
            foldName: name,
            imgList: this.imgList
          }
          sessionStorage.setItem('data', JSON.stringify(data))
        }
      })
    },
    // 获取收藏的数据
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
                this.collectionList.push(item)
              } else {
                let folderImg = res.data.split('[')[1].split(']')[0]
                if (folderImg.indexOf(', {') === -1) {
                  let item = {
                    folderName: JSON.parse(v).folderName,
                    folderId: JSON.parse(v).folderId,
                    ossImage: JSON.parse(folderImg).ossImage
                  }
                  this.collectionList.push(item)
                } else {
                  let item = {}
                  item.list = []
                  folderImg.split(', {').forEach((m, n) => {
                    if (n === 0) {
                      // let item = {
                      //   folderName: JSON.parse(v).folderName,
                      //   folderId: JSON.parse(v).folderId,
                      //   ossImage: JSON.parse(m).ossImage
                      // }
                      item.folderName = JSON.parse(v).folderName
                      item.folderId = JSON.parse(v).folderId
                      item.ossImage = JSON.parse(m).ossImage
                    } else {
                      m = '{' + m
                    }
                    item.list.push({ossImage: JSON.parse(m).ossImage})
                  })
                  this.collectionList.push(item)
                  // this.folderImgList(this.collectionList)
                }
              }
            })
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取个人信息
    getInfoData () {
      let that = this
      that.$http.get('http://www.temaxd.com/Hooott/getUser.cz', {
        params: {
          userId: JSON.parse(localStorage.getItem('token'))
        }
      }).then(res => {
        console.log(JSON.parse(res.data))
        this.user = JSON.parse(res.data)
        if (this.user.userEmail === 'null') {
          this.email = 'Email'
        } else {
          this.email = this.user.userEmail
        }
        if (this.user.userPhone === 'null') {
          this.nickname = 'phone'
        } else {
          // console.log(this.user.userPhone)
          this.nickname = this.user.userPhone.slice(0, 3) + '****' + this.user.userPhone.slice(7, 11)
        }
        this.avatar = this.user.userAvatar
        this.sex = this.user.userSex
      })
    },
    // 上传头像
    changeImage (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.onload = function (e) {
        that.avatar = this.result
      }
      reader.readAsDataURL(file)
      var image = new FormData()
      if (this.user.userAvatar === 'null') {
        this.user.userAvatar = 0
      }
      image.append('file', file)
      that.$http.post('http://www.temaxd.com/Hooott/uploadUserOss.cz', image, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        that.$http.post('http://www.temaxd.com/Hooott/avatarUser.cz', {
          oldAvatar: this.user.userAvatar,
          ossType: file.type.split('/')[1],
          userId: this.user.userId,
          userAvatar: JSON.parse(res.data).userAvatar
        }, { emulateJSON: true }).then(res => {
          console.log(res)
          this.getInfoData()
        })
        // this.getInfoData()
      })
    },
    // 设置
    setUp () {
      this.isSetUpShow = true
      this.isPictureShow = false
    },
    // 创建新收藏
    createNewItem () {
      this.createShow = true
      this.siginOut = false
      this.newCollection = true
      this.isChangePass = false
    },
    // 取消
    cancel () {
      this.createShow = false
    },
    // 创建新收藏夹
    build () {
      let that = this
      that.$http.get('http://www.temaxd.com/Hooott/addFolder.cz', {
        params: {
          userId: JSON.parse(localStorage.getItem('token')),
          folderName: this.folderName
        }
      }).then(res => {
        // this.user = JSON.parse(res.data)
        this.createShow = false
        // console.log(res.data)
        this.collectionList = []
        this.getCollectionData()
      })
    },
    // 确认退出
    signout () {
      this.createShow = false
      localStorage.clear('token')
      this.$router.push('/')
    },
    // 退出账号
    userOut () {
      this.createShow = true
      this.siginOut = true
      this.newCollection = false
      this.isChangePass = false
    },
    // 修改密码的弹窗显示
    changePassword () {
      this.createShow = true
      this.siginOut = false
      this.newCollection = false
      this.isChangePass = true
    },
    // 确认修改
    confirmChange () {
      let that = this
      let config = { headers: { 'Content-Type': 'multipart/form-data' } }
      that.$http.post('http://www.temaxd.com/Hooott/updateUser.cz?account=' + this.user.userPhone + '&oldPwd=' + this.oldPw + '&password=' + this.newPw, {}, config).then(res => {
        // console.log(res)
        let data = JSON.parse(res.data)
        if (data[0].CODE === '200') {
          this.createShow = false
        } else {
          console.log(data[1].MESSAGE)
        }
      })
    },
    forgot () {
      // this.isForgetShow = true
      // this.createShow = false
    }
  },
  components: {
    HeadPage,
    ForgetPassword,
    WaterFull
  }
}
</script>

<style lang="less" scoped>
.personal-center {
  padding-top: 80px;
  .personal {
    width: 100%;
    min-width: 1360px;
    padding-top: 120px;
    margin: 0 auto 100px;
    // border: 1px solid #ccc;
    // overflow: hidden;
    position: relative;
    .back_to_homepage {
      position: absolute;
      top: 60px;
      left: 115px;
      a {
        text-decoration: none;
        cursor: pointer;
      }
      img {
        width: 30px;
        display: block;
        float: left;
        margin-right: 10px;
        transition: 1s;
        &:hover {
          transition: 1s;
          transform: scale(1.2);
        }
      }
      span {
        line-height: 30px;
        text-decoration: none;
        color: #666;
        font-size: 18px;
      }
    }
  }
}
.personal-info {
  float: left;
  width: 356px;
  height: 484px;
  // padding-right: 52px;
  padding-top: 20px;
  border-right: 1px solid #999;
  .img {
    width: 224px;
    height: 224px;
    margin: 0 auto 70px;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    img {
      width: 100%;
      min-height: 100%;
      border-radius: 50%;
      display: block;
    }
    input {
      width: 100%;
      height: 100%;
      // background: rgba(234, 23, 234, 0.3);
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }
  .l {
    width: 129px;
    height: 36px;
    border: 1px solid #ccc;
    margin: 0 auto 32px;
    text-align: center;
    line-height: 36px;
    border-radius: 36px;
    font-size: 20px;
    color: #666;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 5px #ccc;
    }
  }
  .set-up {
    text-align: right;
    letter-spacing: 30px;
  }
}
.right {
  float: left;
  // width: 1000px;
  min-width: 848px;
  .first-enter {
    width: 848px;
    padding: 20px 10px 0;
    // display: flex;
    // flex-wrap: wrap;
    margin: 0 auto 70px;
    justify-content: space-between;
    // border: 1px solid #ccc;
    overflow: hidden;
    .r {
      width: 244px;
      float: left;
      margin:0 29px 50px;
      .pic {
        width: 100%;
        height: 162px;
        background-size: cover;
        background-position: center center;
        margin-bottom: 12px;
        border-radius: 8px;
        cursor: pointer;
      }
      span {
        padding-left: 10px;
        font-size: 16px;
        color: #666;
        cursor: pointer;
      }
    }
    .folder {
      position: relative;
      .cover {
        &:hover {
          transition: 1s;
          background: rgba(255, 255, 255, 0.7);
        }
        cursor: pointer;
        width: 100%;
        height: 162px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .create-new {
      .pic {
        width: 240px;
        height: 158px;
        border: 2px solid rgb(187, 187, 187);
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
      box-shadow: 0 0 6px rgb(187, 187, 187);
    }
      }
      img {
        width: 38px;
      }
    }
  }
  .images {
    padding-left: 56px;
    // border-left: 1px solid #ccc;
    min-height: 511px;
    padding-bottom: 300px;
    // border-bottom: 1px solid #ccc;
    // margin-bottom: 30px;
    .name {
      line-height: 30px;
      font-size: 20px;
      color:  #666;
      padding: 0 0 20px 8px;
      // padding-left: 10px;
      img {
        width: 30px;
        float: left;
        margin-right: 10px;
        cursor: pointer;
        transition: 1s;
        &:hover {
          transition: 1s;
          transform: scale(1.2);
        }
      }
    }
    .img-list {
      min-height: 400px;
      position: relative;
      padding-top: 20px;
    }
  }
  .set-up-show {
    width: 918px;
    min-height: 511px;
    margin: -30px 0 80px 0;
    position: relative;
    padding-left: 42px;
    .border {
      width: 1px;
      background: #ccc;
      height: 511px;
      position: absolute;
      top: 30px;
      left: 0;
    }
    h2 {
      font-size: 25px;
      color: #666;
      line-height: 36px;
      margin-bottom: 28px;
    }
    .modify {
      padding-left: 13px;
      .tit {
        line-height: 36px;
        font-size: 20px;
        color: #666;
        margin-bottom: 10px;
      }
      .email,.nickname {
        height: 51px;
        margin-bottom: 30px;
        position: relative;
        input {
          border: 0;
          height: 42px;
          width: 226px;
          background: #e6e6e6;
          color: #888;
          font-size: 14px;
          border-radius: 2px;
          text-indent: 10px;
          outline: none;
          &.codeBox {
            &::-webkit-input-placeholder{
              color: #999;
              font-size: 12px;
            }
            &::-moz-placeholder{
              color: #999;
              font-size: 12px;
            }
            &:-moz-placeholder{
              color: #999;
              font-size: 12px;
            }
            &:-ms-input-placeholder{
              color: #999;
              font-size: 12px;
            }
            // width: 100px;
            width: 0;
            margin-left: 80px;
            height: 30px;
            color: #999;
            :-moz-placeholder {
              color: #999;
            }
          }
        }
        .img {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 6px;
          left: 246px;
          // margin-left: 20px;
          background-image: url(../assets/send.png);
          background-size: cover;
          cursor: pointer;
          &:hover {
            background-image: url(../assets/send2.png);
          }
        }
      }
      .password {
        button {
          width: 90px;
          height: 30px;
          color: #383838;
          background: #e6e6e6;
          border: 0;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          outline: none;
          margin: 14px 0;
          &:hover {
            background: rgb(197, 197, 197);
          }
        }
      }
      .sex {
        input {
          width: 21px;
          height: 16px;
          margin: 7px 9px 27px 0;
        }
      }
      .head-portrait {
        overflow: hidden;
        img {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 1px solid #ccc;
          display: block;
          float: left;
        }
        button {
          width: 90px;
          height: 30px;
          color: #383838;
          background: #e6e6e6;
          border: 0;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          outline: none;
          margin: 50px 0 0 20px;
          position: relative;
          &:hover {
            background: rgb(197, 197, 197);
          }
          input {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            outline: none;
            cursor: pointer;
          }
        }
      }
    }
    .save {
      width: 113px;
      height: 43px;
      background: #e51c23;
      border-radius: 4px;
      color: #fff;
      font-size: 18px;
      font-weight: 800;
      line-height: 43px;
      text-align: center;
      margin: 30px auto 0;
      cursor: pointer;
      transition: 1s;
      &:hover {
        background: #b1161b;
        transition: 1s;
      }
    }
  }
}
.new-collections,.forget_pw {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 99;
  .alert {
    width: 560px;
    height: 213px;
    background: #fff;
    border-radius: 10px;
    position: relative;
    top: 50%;
    left: 50%;
    margin: -106px 0 0 -280px;
    h2 {
      height: 60px;
      border-bottom: 1px solid #ccc;
      line-height: 60px;
      padding-left: 25px;
      font-weight: 400;
      font-size: 25px;
      color: #010101;
    }
    .name {
      height: 70px;
      line-height: 70px;
      font-size: 20px;
      border-bottom: 1px solid #ccc;
      span {
        padding: 0 60px 0 50px;
      }
      input {
        width: 350px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        text-indent: 10px;
      }
    }
    .cancel {
      button {
        float: right;
        width: 50px;
        height: 30px;
        font-size: 14px;
        background: #ededed;
        color: #636363;
        border: 0;
        border-radius: 4px;
        margin-top: 20px;
        margin-right: 20px;
        cursor: pointer;
        outline: none;
        transition: 1s;
        &:hover {
          background: #d6d5d5;
          transition: 1s;
        }
      }
    }
  }
  .change_password {
    width: 476px;
    height: 380px;
    margin: -280px 0 0 -238px;
    img {
      width: 24px;
      position: absolute;
      right: 30px;
      top: 20px;
      cursor: pointer;
    }
    h3 {
      line-height: 41px;
      font-size: 25px;
      color: #666;
      padding: 22px 0 19px 0;
      font-weight: 400;
      text-align: center;
    }
    .alter {
      padding-left: 56px;
      overflow: hidden;
      margin-bottom: 20px;
      .forget {
        line-height: 23px;
        font-size: 14px;
        color: #666;
        text-indent: 88px;
        padding: 10px 0;
        cursor: pointer;
      }
      input {
        width: 228px;
        height: 42px;
        border: 0;
        background: #e6e6e6;
        border-radius: 4px;
        text-indent: 6px;
        outline: none;
      }
      .code {
        width: 82px;
        line-height: 42px;
        font-size: 16px;
        color: #666;
        float: left;
      }
    }
    .cancel {
      border-top: 1px solid #e6e6e6;
      height: 60px;
      position: relative;
      margin-top: 28px;
      button {
        margin: 10px 30px 0 0;
        width: 51px;
        height: 40px;
      }
    }
  }
}
.forget_pw {
  .forget_password {
    width: 500px;
    height: 300px;
    background: rgba(255, 255, 255, 0.6);
    position: relative;
    left: 50%;
    top: 50%;
    margin-top: -150px;
    margin-left: -250px;
    border-radius: 10px;
    text-align: center;
  }
}
</style>
