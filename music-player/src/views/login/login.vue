<template>
  <div>
    <div class="Img_Box">
      <img src="../../assets/no_music.jpg" width="100%" height="100%" />
    </div>
    <div class="Img_Box">
      <vue-particles color="#FFFAFA" :particleOpacity="0.5" :particlesNumber="150"  :particleSize="4" linesColor="FFFAFA" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"/>
    </div>
    <div style="vertical-align: middle">
      <el-card id="logincard" class="Login_Card" style="border-radius: 12px">
        <el-row justify="center" style="margin: 30px 0px 10px 0px">
          <el-col>
            <el-form ref="form" :model="form" label-width="40px" :hide-required-asterisk="true" size="medium">
              <el-form-item label="邮箱" class="blackItem">
                <el-input
                  v-model="form.email"
                  placeholder="请输入邮箱"
                  clearable
                  autofocus
                  autocomplete
                  style="width: 230px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" class="blackItem">
                <el-input
                  v-model="form.password"
                  showPassword
                  placeholder="请输入密码"
                  clearable
                  autofocus
                  autocomplete
                  style="width: 230px;"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center" style="margin: 30px 0 10px 0px">

          <el-button class="buttonColor"
                     @click="login"
                     size="medium"
                     round
                     style="width: 280px"
                     type="primary"
          >登录</el-button>

        </el-row>

        <el-row style="text-align: center;">
          <el-col :span="8" :offset="3">

            <router-link :to="'/register'">
              <el-link :underline="false" style="color: white">注册账号</el-link>
            </router-link>
          </el-col>
          <el-col :span="12">
            <router-link :to="'/forgetpassword'">
              <el-link :underline="false" style="color: white">找回密码</el-link>
            </router-link>
          </el-col>
        </el-row>

      </el-card>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '../../api/login'
export default{
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') !== null) {
      this.$router.push({ path: '/index' })
    }
  },
  methods: {
    login () {
      let parm = {
        'email': this.form.email,
        'password': require('js-sha256').sha256(this.form.password)
      }
      debugger
      loginAPI(parm).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '登录成功！'
          })
          window.sessionStorage.setItem('userID', res.data.data)
          this.$router.push({ path: '/index' })
        } else if (res.data.code === 500) {
          this.$message({
            type: 'error',
            message: '邮箱或密码错误'
          })
          this.form.email = ''
          this.form.password = ''
        }
      })
    }
  }
}
</script>

<style>
  .Img_Box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .logoImage {
    height: 100%;
    width: 100%;
  }

  .buttonColor{
    background: #2e0f6d;
    border-color: #2e0f6d;
    color: #fff;

  }

  .Login_Card {
    height: fit-content;
    width: 31%;
    background: rgba(255, 255, 255, 0);
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(3px);
    padding: 10px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .blackItem .el-form-item__label{
    color: white;
    size: 35px;
  }
</style>
