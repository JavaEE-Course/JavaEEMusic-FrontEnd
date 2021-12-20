<template>
  <div>
      <el-card class="card">
        <div style="display: flex;flex-direction: row" >
        <img class="song-card" :src="musicPhoto" alt="res"/>
        <div style="width: 1000px;height: 130px;display: flex">
          <div class="process-card">
            <el-slider :show-tooltip="false" v-model="playProcess"></el-slider>
            <div>
              <div class="music-time">0:00</div>
              <div class="music-time"  style="margin-left: 93%">{{musicTime}}</div>
            </div>
            <div>
              <img title="播放设置" src="../assets/musicPlay/order.png" style="height: 30px;width: 30px" alt=""/>
              <img title="上一首" src="../assets/musicPlay/front.png" style="margin-left:30px;height: 30px;width:30px" alt=""/>
              <div v-show="pauseVisible" title="播放|暂停" style="margin-left:30px;" class="el-icon-video-pause icon1" @click="playOrPause"></div>
              <div v-show="playVisible" title="播放|暂停" style="margin-left:30px;" class="el-icon-video-play icon1" @click="playOrPause"></div>
              <img title="下一首" src="../assets/musicPlay/next.png" style="margin-left:30px;height: 30px;width: 30px" alt=""/>
              <img title="歌单列表" src="../assets/musicPlay/detail.png" style="margin-left:30px;height: 30px;width: 30px" alt="" />
            </div>
          </div>
        </div>
        </div>
      </el-card>
    <audio id="audio" preload="metadata" v-show="false" :src="musicURL" controls="controls" ref="audio"></audio>
  </div>
</template>

<script>
import {getmyplaylistAPI} from '../api/getsonglist'
import {getplaylistdetailAPI} from '../api/getplaylistdetail'

export default {
  name: 'AudioBar',
  data () {
    return {
      // 基本信息
      musicPhoto: 'https://p1.music.126.net/CcthX_ZCexIdriZADoNn3g==/109951165628166191.jpg',
      playProcess: 80,
      musicTime: '3:21',
      pauseVisible: false,
      playVisible: true,
      musicURL: 'https://javaee-music.oss-cn-beijing.aliyuncs.com/2021-12-11498c8852-8a7e-49f3-be89-8853fdacb9aajiangnan.mp3',
      musicList: [],
      // 歌单相关
      playListIfo: []

    }
  },
  created () {
    const userId = {'user_id': window.sessionStorage.getItem('userID')}
    // 获取我的歌单
    getmyplaylistAPI(userId).then(res => {
      this.playListInfo = res.data.data
      if (this.playListInfo.length > 0) {
        const playlistId = {'playlist_id': this.playListInfo[0].playlist_id}
        getplaylistdetailAPI(playlistId).then(res => {
          console.log('哈哈哈和')
          console.log(res)
        })
      }
    })
  },
  methods: {
    playOrPause () {
      if (this.pauseVisible) {
        this.pauseVisible = false
        this.playVisible = true
        this.$refs.audio.pause()
      } else {
        this.pauseVisible = true
        this.playVisible = false
        const playPromise = this.$refs.audio.play()
        if (playPromise !== undefined) {
          console.log(playPromise)
          playPromise.then(() => {
            this.$refs.audio.play()
          }).catch(() => {
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  .song-card{
    height: 95px;
    width: 95px;
    filter: drop-shadow(8px 8px 10px powderblue);
  }
  .card{
    background:blueviolet;
    filter:alpha(opacity:30);
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    margin-left: 80px;
    width: 1200px;
    height: 130px;
  }
  .process-card{
    margin-left: 100px;
    float: left;
    width: 1000px;
  }
  .music-time{
    float: left;
    color: wheat;
  }
  .icon1{
    margin-top: -50px;
    margin-left: 30px;
    font-size: 40px;
    color: whitesmoke;
  }
</style>
