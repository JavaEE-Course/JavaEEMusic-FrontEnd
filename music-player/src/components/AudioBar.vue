<template>
  <div>
      <el-card class="card">
        <div style="display: flex;flex-direction: row" >
        <img class="song-card" :src="musicPhoto" alt="res"/>
        <div style="width: 1000px;height: 130px;display: flex">
          <div class="process-card">
            <el-slider :show-tooltip="false" v-model="playProcess" @change="flushPlay"></el-slider>
            <div>
              <div class="music-time">0:00</div>
              <div class="music-time" style="margin-left: 93%">{{musicTime}}</div>
            </div>
            <div>
              <img title="播放设置" :src="typePic" style="height: 30px;width: 30px" alt="" @click="changePlayType"/>
              <img title="上一首" src="../assets/musicPlay/front.png" style="margin-left:30px;height: 30px;width:30px" alt="" @click="previousSong"/>
              <div v-show="pauseVisible" title="播放|暂停" style="margin-left:30px;" class="el-icon-video-pause icon1" @click="playOrPause"></div>
              <div v-show="playVisible" title="播放|暂停" style="margin-left:30px;" class="el-icon-video-play icon1" @click="playOrPause"></div>
              <img title="下一首" src="../assets/musicPlay/next.png" style="margin-left:30px;height: 30px;width: 30px" alt="" @click="nextSong"/>
              <img title="歌单列表" src="../assets/musicPlay/detail.png" style="margin-left:30px;height: 30px;width: 30px" alt="" @click="chooseSong"/>
            </div>
          </div>
        </div>
        </div>
      </el-card>
    <audio id="audio" preload="metadata" v-show="false" :src="musicURL" controls="controls" ref="audio"></audio>
    <el-dialog
      title="请选择歌曲"
      :visible.sync="chooseSongVisible"
      width="30%">
      <div v-for="(item,index) in songNameList" :key="index">
        <el-radio style="font-size: 24px" v-model="radio" :label="index">{{item}}</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="chooseSongVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmSong">确 定</el-button>
     </span>
    </el-dialog>
  </div>
</template>

<script>
import {getmyplaylistAPI} from '../api/getsonglist'
import {getPlaylistInfoAPI} from '../api/getplaylistdetail'

export default {
  name: 'AudioBar',
  data () {
    return {
      // 基本信息
      musicPhoto: '',
      playProcess: 0,
      musicLastTime: '--:--',
      musicTime: '--:--',
      pauseVisible: false,
      playVisible: true,
      musicURL: '',
      musicName: '',
      totalTime: 0,
      // 歌单相关
      currentSongNumber: 0,
      musicList: [],
      songPathList: [],
      songCoverList: [],
      songNameList: [],
      chooseSongVisible: false,
      radio: 0,
      // 播放类型
      typePic: require('../assets/musicPlay/order.png'),
      typeNumber: 0,
      // 定时播放相关
      clock: ''
    }
  },
  created () {
    const userId = {'user_id': window.sessionStorage.getItem('userID')}
    // 获取我的歌单
    getmyplaylistAPI(userId).then(res => {
      this.playListInfo = res.data.data
      if (this.playListInfo.length > 0) {
        const playlistId = {'playlist_id': this.playListInfo[0].playlist_id}
        getPlaylistInfoAPI(playlistId).then(res => {
          this.musicList = res.data.data.song_list
          for (let i = 0; i < this.musicList.length; i++) {
            this.songPathList.push(this.musicList[i].song_path)
            this.songCoverList.push(this.musicList[i].cover_path)
            this.songNameList.push(this.musicList[i].song_name)
          }
          this.currentSongNumber = 0
          this.radio = this.currentSongNumber
          this.musicPhoto = this.songCoverList[this.currentSongNumber]
          this.musicURL = this.songPathList[this.currentSongNumber]
          this.songName = this.songNameList[this.currentSongNumber]
        })
      }
    })
  },
  methods: {
    // TODO：一首歌结束之后自动播放下一首歌
    // TODO：更新当前的时间
    // 定时
    countUp () {
      window.clearInterval(this.clock)
      // eslint-disable-next-line no-unused-vars
      let maxTime = 0
      if (!isNaN(this.$refs.audio.duration)) {
        maxTime = Math.floor(this.$refs.audio.duration)
      } else return
      this.clock = window.setInterval(() => {
        this.playProcess = this.playProcess + 1 / maxTime * 100
        this.resetTime()
        if (this.playProcess >= 100) {
          window.clearInterval(this.clock)
        }
      }, 1000)
    },
    // 拖动进度条播放音乐
    flushPlay (process) {
      this.playProcess = process
      if (!isNaN(this.$refs.audio.duration)) {
        this.$refs.audio.currentTime = process * 0.01 * this.$refs.audio.duration
        this.resetTime()
      }
    },
    // 重新设定时间
    resetTime () {
      this.totalTime = this.$refs.audio.duration
      if (isNaN(this.totalTime)) return
      let minutes = Math.floor(this.totalTime / 60)
      let seconds = Math.floor(this.totalTime - minutes * 60)
      this.musicTime = minutes + ':' + seconds
    },
    rePlay () {
      // 需要重新播放
      this.pauseVisible = true
      this.playVisible = false
      const playPromise = this.$refs.audio.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.$refs.audio.play()
        }).catch(() => {
        })
      }
      this.countUp()
    },
    // 播放和暂停
    playOrPause () {
      if (this.pauseVisible) {
        this.pauseVisible = false
        this.playVisible = true
        this.$refs.audio.pause()
        window.clearInterval(this.clock)
        this.resetTime()
      } else {
        this.rePlay()
      }
    },
    // 前一首
    previousSong () {
      // 列表播放
      if (this.typeNumber === 0) {
        if (this.currentSongNumber === 0) this.currentSongNumber = this.songCoverList.length
        this.currentSongNumber = (this.currentSongNumber - 1) % this.songCoverList.length
      } else if (this.typeNumber === 2) {
        // 随机播放
        let randomNumber = Math.round(Math.random() * (this.songCoverList.length - 1))
        while (randomNumber === this.currentSongNumber) {
          randomNumber = Math.round(Math.random() * this.songCoverList.length)
        }
        this.currentSongNumber = randomNumber
      }
      this.radio = this.currentSongNumber
      this.musicPhoto = this.songCoverList[this.currentSongNumber]
      this.musicURL = this.songPathList[this.currentSongNumber]
      this.songName = this.songNameList[this.currentSongNumber]
      this.playProcess = 0
      this.rePlay()
    },
    // 下一首
    nextSong () {
      // 列表播放
      if (this.typeNumber === 0) {
        this.currentSongNumber = (this.currentSongNumber + 1) % this.songCoverList.length
      } else if (this.typeNumber === 2) {
        // 随机播放
        let randomNumber = Math.round(Math.random() * (this.songCoverList.length - 1))
        while (randomNumber === this.currentSongNumber) {
          randomNumber = Math.round(Math.random() * this.songCoverList.length)
        }
        this.currentSongNumber = randomNumber
      }
      this.radio = this.currentSongNumber
      this.musicPhoto = this.songCoverList[this.currentSongNumber]
      this.musicURL = this.songPathList[this.currentSongNumber]
      this.songName = this.songNameList[this.currentSongNumber]
      this.playProcess = 0
      this.rePlay()
    },
    changePlayType () {
      // 0 -- 顺序播放 1 -- 单曲循环 2 -- 随机播放
      this.typeNumber = (this.typeNumber + 1) % 3
      if (this.typeNumber === 0) {
        this.typePic = require('../assets/musicPlay/order.png')
      } else if (this.typeNumber === 1) {
        this.typePic = require('../assets/musicPlay/circle.png')
      } else if (this.typeNumber === 2) {
        this.typePic = require('../assets/musicPlay/random.png')
      }
    },
    // 查看播放列表
    chooseSong () {
      this.chooseSongVisible = true
    },
    // 确认歌曲
    confirmSong () {
      this.chooseSongVisible = false
      this.currentSongNumber = this.radio
      this.musicPhoto = this.songCoverList[this.currentSongNumber]
      this.musicURL = this.songPathList[this.currentSongNumber]
      this.songName = this.songNameList[this.currentSongNumber]
      this.playProcess = 0
      this.rePlay()
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
