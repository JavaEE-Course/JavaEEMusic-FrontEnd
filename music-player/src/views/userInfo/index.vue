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
            <img :src="userinfo.avatorPath" alt="">
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
                <span>用户密码：{{userinfo.password}}</span>
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
          <el-button type="primary" @click="loadbook">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getuserinfoAPI } from '@/api/getuserinfo'
export default {
  created () {
    this.flashColor()
    // let parm = {
    //   'id': storage.get('user_id', 0)
    // }
    getuserinfoAPI().then(res => {
      console.log(res)
    })
  },
  data () {
    return {
      dialogVisible: false,
      userinfo: {
        email: '1234232133@qq.com',
        nickname: 'nzh',
        password: 'as66',
        gender: '男',
        avatorPath: 'https://p2.music.126.net/c6Rddgfp3nKG-cPhyn4STg==/109951166485018774.jpg'
      },
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
</style>
