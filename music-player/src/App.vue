<template>
  <div id="app">
    <el-button v-if="testRoutePath()" id="musicButton" class="el-icon-headset button-bar" circle @click="changeAudioBarVisible"></el-button>
    <AudioBar v-if="testRoutePath()" v-show="audioBarVisible" class="audio-bar"/>
    <router-view/>
  </div>
</template>

<script>
import Home from './views/home/index'
import AudioBar from './components/AudioBar'
export default {
  name: 'App',
  components: {AudioBar, Home},
  data () {
    return {
      audioBarVisible: true
    }
  },
  methods: {
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
