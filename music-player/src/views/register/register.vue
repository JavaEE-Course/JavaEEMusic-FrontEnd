<template>
  <div>
    <div class="Img_Box">
      <img src="../../assets/no_music.jpg" width="100%" height="100%" />
    </div>
    <div class="Img_Box">
      <vue-particles color="#FFFAFA" :particleOpacity="0.5" :particlesNumber="150"  :particleSize="4" linesColor="FFFAFA" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"/>
    </div>
    <el-card class="Register_Card" style="border-radius: 12px">
      <el-row justify="center">
        <el-col>
          <el-form
            ref="RegisterForm"
            :model="form"
            :rules="rules"
            label-width="70px"
            :hide-required-asterisk="true"
            size="medium"
            class="Register_Form"
          >
            <el-form-item label="用户名" prop="username" class="blackItem">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="blackItem">
              <el-input
                v-model="form.password"
                showPassword
                placeholder="请输入密码"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword" clearable class="blackItem">
              <el-input
                v-model="form.checkPassword"
                showPassword
                placeholder="请再次输入密码"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" class="blackItem">
              <el-row type="flex">
                <el-input
                  v-model="form.email"
                  placeholder="请输入邮箱"
                  clearable
                ></el-input>
                <el-button
                  type="primary"
                  plain
                  @click="sendEmail()"
                  :disabled="isOK"
                >{{ timeCnt }}</el-button
                >
              </el-row>
            </el-form-item>
            <el-form-item label="验证码" prop="verifyEmail" class="blackItem">
              <el-input
                v-model="form.verifyEmail"
                placeholder="请输入验证码"
                clearable
              ></el-input>
            </el-form-item>

            <el-row type="flex" justify="center" style="margin: 0px 0 10px 0px">
              <el-button
                @click="submitForm"
                size="medium"
                round
                style="width: 70%"
                type="primary"
                class="Register_Button"
              >注册</el-button
              >
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <router-link to="/">
          <el-link :underline="false" style="color: white">返回</el-link>
        </router-link>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {registerAPI, emailVerification} from '../../api/register'

export default {
  props: ['type'],
  data () {
    return {
      // 发送邮箱避免频繁发送
      timeCnt: '验证',
      isOK: true,
      cnthandler: null,
      form: {
        username: '',
        password: '',
        checkPassword: '',
        email: '',
        verifyEmail: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {
            // pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
            max: 10,
            message: '长度为1~10个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/,
            message:
                '必须包含大小写字母和数字的组合，长度在 8-10 之间',
            trigger: 'blur'
          }
        ],
        checkPassword: [
          {required: true, message: '请再次输入密码', trigger: 'change'},
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'change'},
          {
            validator: (rule, value, callback) => {
              if ((/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/).test(value)) {
                this.isOK = false
                callback()
              } else {
                this.isOK = true
                callback(new Error('请填写正确的邮箱'))
              }
            },
            trigger: 'change'
          }
        ],
        verifyEmail: [
          {required: true, message: '请输入验证码', trigger: 'change'}
        ]
      }
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') !== null) {
      this.$router.push({ path: '/index' })
    }
  },
  methods: {
    cnt: function () {
      this.cnthandler = setTimeout(() => {
        if (this.timeCnt === 0) {
          clearInterval(this.cnthandler)
          this.timeCnt = '验证'
          this.isOK = false
          return
        }
        this.timeCnt--
        this.cnt()
      }, 1000)
    },
    sendEmail () {
      const params = {
        'email': this.form.email
      }
      emailVerification(params).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '成功发送验证码，请注意查收'
          })
        }
      })
    },
    submitForm () {
      const params = {
        'nickname': this.form.username,
        'password': require('js-sha256').sha256(this.form.password),
        'email': this.form.email,
        'code': this.form.verifyEmail
      }
      if (!(this.form.verifyEmail.length && this.form.username && this.form.password && this.form.verifyEmail && this.form.checkPassword)) {
        this.$message({
          type: 'error',
          message: '请输入全部的信息'
        })
        return
      }
      registerAPI(params).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '注册成功！'
          })
          this.$router.push({ path: '/login' })
        } else {
          this.$message({
            type: 'error',
            message: '邮箱已被注册过，请使用其它邮箱!'
          })
          this.form.email = ''
          this.form.verifyEmail = ''
        }
      })
    }
  }
}
</script>

<style>
  .Register_Card {
    height: fit-content;
    width: 30%;
    background: rgba(255, 255, 255, 0);
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(3px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    margin: auto;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .Img_Box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .el-card {
    border-radius: 15px;
  }
  .logoImage {
    height:80%;
    width: 80%;
    display: inline-block;
    justify-content: center;
  }
  .blackItem .el-form-item__label{
    color: white;
    size: 35px;
  }
  .Register_Button{
    background: #2e0f6d;
    border-color: #2e0f6d;
    color: #fff;
  }
  /*.Register_Form{*/
  /*  transform: translateX(2%);*/
  /*}*/
</style>
