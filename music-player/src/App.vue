<template>
  <div id="app">
    <el-button v-if="testRoutePath()" class="el-icon-headset button-bar" circle @click="changeAudioBarVisible"></el-button>
    <el-button v-if="testRoutePath() || this.$route.path === '/playMusic' " v-show="!detailVisible" class="el-icon-arrow-up detail-bar" circle @click="changeSongDetailInfo"></el-button>
    <el-button v-if="testRoutePath() || this.$route.path === '/playMusic' " v-show="detailVisible" class="el-icon-arrow-down detail-bar" circle @click="changeSongDetailInfo"></el-button>
    <AudioBar v-if="testRoutePath()" v-show="audioBarVisible" class="audio-bar"/>
    <router-view/>
  </div>
</template>

<script>
import Home from './views/home/index'
import AudioBar from './components/AudioBar'
// TODO:playMusic组件到其他组件之间的跳转
export default {
  name: 'App',
  components: {AudioBar, Home},
  data () {
    return {
      audioBarVisible: true,
      detailVisible: false,
      routePath: ''
    }
  },
  methods: {
    changeSongDetailInfo () {
      this.detailVisible = !this.detailVisible
      this.audioBarVisible = !this.audioBarVisible
      if (this.detailVisible) {
        this.routePath = this.$route.path
        this.$router.push('/playMusic')
      } else {
        this.$router.push(this.routePath)
      }
    },
    changeAudioBarVisible () {
      this.audioBarVisible = !this.audioBarVisible
    },
    testRoutePath () {
      if (this.$route.path === '/') {
        return false
      } else if (this.$route.path === '/login') {
        return false
      } else if (this.$route.path === '/register') {
        return false
      } else if (this.$route.path === '/forgetpassword') {
        return false
      } else if (this.$route.path === '/playMusic') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.detail-bar{
  z-index: 9999;
  position: fixed;
  top:81%;
  right: 20px;
}
.button-bar{
  z-index: 9001;
  position: fixed;
  top:90%;
  right: 20px;
}
.audio-bar{
  z-index: 9000;
  position: fixed;
  top:77%;
}
</style>
