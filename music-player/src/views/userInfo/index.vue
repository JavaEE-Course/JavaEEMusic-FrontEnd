<template>
  <div>
    <div class="Img_Box">
      <img src="../../assets/psc.jpg" width="100%" height="100%" />
    </div>
    <div>
      <el-card class="card" shadow="hover" style="height:0;width: 0" ref="elCard" v-bind:style="elCard"></el-card>
    </div>
    <div>
      <el-card class="card" shadow="hover" style="height:290px;width: 65%;margin-top: 120px" ref="elCard" v-bind:style="elCard">
        <el-row>
          <el-col :span="6">
            <div class="singer-img-wrap">
              <el-card style="height: 250px;" @click.native="avatorV=true">
                <img :src="userinfo.avatorPath" alt="">
              </el-card>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="right">
              <div class="singer-name">
                <div class="tag1">用户信息</div>
              </div>
              <div class="singer-user-info" style="margin-top: 10px">
                <span>用户昵称：{{userinfo.nickname}}</span>
              </div>
              <div class="singer-user-info" style="margin-top: 10px">
                <span>用户邮箱：{{userinfo.email}}</span>
              </div>
              <div class="singer-user-info" style="margin-top: 10px">
                <span>用户性别：{{userinfo.gender}}</span>
              </div>
              <div>
                <el-button style="color: #5f91d6;margin-left: 320px;margin-top: 20px" @click="dialogVisible = true">修改个人信息</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="dialog">
      <el-dialog title="修改头像" :visible.sync="avatorV">
<!--        <el-upload-->
<!--          class="avatar-uploader"-->
<!--          action="https://jsonplaceholder.typicode.com/posts/"-->
<!--          :on-success="handleAvatarSuccess"-->
<!--          :show-file-list="false">-->
<!--          <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--        </el-upload>-->
        <el-upload ref="upload"
                   action="#"
                   accept="image/png,image/gif,image/jpg,image/jpeg"
                   list-type="picture-card"
                   :auto-upload="false"
                   :on-exceed="handleExceed"
                   :before-upload="handleBeforeUpload"
                   :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemove"
                   :on-change="imgChange"
                   :class="{hide:hideUpload}">
          <i class="el-icon-plus"></i>
          <img width="100%"
               :src="ImageUrl"
               alt="">
        </el-upload>
        <div slot="footer" class="dialog-footer" style="margin-top: -20px">
          <el-button @click="avatorV = false">取 消</el-button>
          <el-button type="primary" @click="avatorSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改个人信息" :visible.sync="dialogVisible">
        <el-form :model="meform">
          <el-form-item label="请输入新昵称" :label-width="formLabelWidth" style="margin-top: -20px">
            <el-input v-model="meform.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请输入新邮箱" :label-width="formLabelWidth" style="margin-top: -20px">
            <el-input v-model="meform.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请输入新密码" :label-width="formLabelWidth" style="margin-top: -20px">
            <el-input v-model="meform.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请输入性别" :label-width="formLabelWidth" style="margin-top: -20px">
            <el-input v-model="meform.gender" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: -20px">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getuserinfoAPI, edituserinfoAPI } from '@/api/getuserinfo'
export default {
  created () {
    this.flashColor()
    let parm = {
      'id': window.sessionStorage.getItem('userID')
    }
    getuserinfoAPI(parm).then(res => {
      console.log('nikan')
      console.log(res.data)
      this.userinfo = res.data.data
    })
  },
  data () {
    return {
      imageUrl: '',
      dialogVisible: false,
      avatorV: false,
      userinfo: {},
      meform: {
        email: '',
        nickname: '',
        password: '',
        gender: '',
        avatorPath: ''
      },
      elCard: {
        background: '#dcc4cf'
      },
      level: 1,
      hexArr: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e']
    }
  },
  methods: {
    flashColor () {
      var color = '#5f91d6'
      this.elCard.background = color + this.hexArr[this.level] + this.hexArr[this.level]
      this.level++
      if (this.level >= 16) {
        clearTimeout(this.flashColor)
      } else {
        setTimeout(this.flashColor, 300)
      }
    },
    submit () {
      let parm = {
        'id': window.sessionStorage.getItem('userID'),
        'email': this.meform.email,
        'password': this.meform.password,
        'gender': this.meform.gender,
        'nickname': this.meform.nickname,
        'avatar': this.meform.avatar
      }
      edituserinfoAPI(parm).then(res => {
        console.log(res.data)
      })
    },
    handleAvatarSuccess (res, file) {
      console.log('nihao')
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
    },
    avatorSubmit () {
      console.log(this.imageUrl)
    }
  }
}
</script>

<style scoped>
  .Img_Box {
    height: fit-content;
    position: fixed;
    top: 0;
    left: 0;
    width: 102%;
    z-index: -1;
  }
  .card{
    opacity: 0.75;
    align-content: center;
    margin: auto;
    display: flex;
  }
  .singer-img-wrap {
    width: 200px;
    height: 250px;
  }
  .singer-img-wrap img {
    width: 100%;
    height: 100%;
  }

  .right{
    margin-left: 80px;
  }
  .singer-name {
    font-size: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .singer-user-info {
    display: flex;
    align-items: center;
    font-size: 18px;
  }
  .dialog /deep/ .el-dialog__wrapper {
    background-color:rgba(0,0,0,0.5);
    color: #77aee5;
  }
  .dialog /deep/ .el-dialog__body {
    background-color:#77aee5;
  }
  .dialog /deep/ .el-dialog__header {
    background-color:#77aee5;
  }
  .dialog /deep/ .el-dialog__footer {
    background-color:#77aee5;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
