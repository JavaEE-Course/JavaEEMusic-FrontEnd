<template>
  <div>
    <!--背景图片-->
    <div class="Img_Box">
      <img :src="cover" width="100%" height="100%" />
    </div>
    <!--左侧歌曲信息-->
    <el-card class="card">
      <div>
        <img :src="cover" class="song-card" alt="res"/>
        <div class="song-name-info">
          <div class="song-name">
            <div class="tag1">歌名</div>{{songName}}
          </div>
            <div class="singer-name">{{singerName}}</div>
            <div class="album-name">{{albumName}}</div>
        </div>
      </div>
      <div class="mid-card">
        <div title="取消收藏" v-show="false" class="el-icon-star-on icon"></div>
        <div title="收藏" class="el-icon-star-off icon"></div>
        <div title="查看评论" class="el-icon-chat-dot-round icon"></div>
        <div title="查看评分" class="el-icon-bell icon"></div>
        <div title="详细信息" class="el-icon-warning-outline icon"></div>
      </div>
      <div class="process-card">
        <el-slider v-model="playProcess"></el-slider>
        <div>
          <div class="music-time">0:00</div>
          <div class="music-time" style="margin-left: 81%">{{musicTime}}</div>
        </div>
      </div>
      <div class="bottom-card">
        <img title="播放设置" src="../../assets/musicPlay/order.png" style="height: 40px;width: 40px"/>
        <img title="上一首" src="../../assets/musicPlay/front.png" style="height: 40px;width: 40px"/>
        <div v-show="pauseVisible" title="播放|暂停" class="el-icon-video-pause icon1" @click="playOrPause"></div>
        <div v-show="playVisible" title="播放|暂停" class="el-icon-video-play icon1" @click="playOrPause"></div>
        <img title="下一首" src="../../assets/musicPlay/next.png" style="height: 40px;width: 40px"/>
        <div title="歌单列表" class="el-icon-more icon"></div>
      </div>
    </el-card>
    <audio v-show="false" ref='audio' :src="music" controls="controls"></audio>
    <!--右侧滚动歌词-->
  </div>
</template>

<script>
import { getSongDetailAPI } from '../../api/getsonglist'
export default {
  name: 'PlayMusic',
  data () {
    return {
      music: '',
      cover: '',
      songName: '',
      singerName: '',
      albumName: '',
      commentNumber: 0,
      playProcess: 80,
      musicTime: '3:21',
      // 组件可见性
      pauseVisible: false,
      playVisible: true
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) {
      this.$router.push({ path: '/login' })
    }
    const songId = {'song_id': 2}
    getSongDetailAPI(songId).then(res => {
      console.log(res)
      this.music = res.data.data.song_path
      this.cover = res.data.data.cover_path
      this.songName = res.data.data.song_name
      this.singerName = res.data.data.singer_name
      this.albumName = res.data.data.album_name
      this.commentNumber = res.data.data.comment_number
    })
  },
  methods: {
    playOrPause () {
      // 需要暂停
      // 需要播放
    }
  }
}
</script>

<style scoped>
.Img_Box {
  background: transparent;
  filter: blur(1.17rem);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.song-card{
  float: left;
  height: 140px;
  display: flex;
  filter: drop-shadow(8px 8px 10px powderblue);
}
.song-name-info {
  padding: 0 20px;
  flex: 1;
  margin-left: 170px;
}
.song-name {
  font-size: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: wheat;
}
.song-name-info .tag1 {
  color: #5f91d6;
  border: 1px solid #2e0f6d;
  display: inline-block;
  font-size: 20px;
  margin-right: 10px;
  border-radius: 5px;
  padding: 0px 7px;
  cursor: default;
}
.singer-name{
  color: #8ef1ef;
  margin-top: 25px;
}
.album-name{
  color: #8ef1ef;
  margin-top: 25px;
}
.card{
  background: transparent;
  margin-left: 150px;
  height: 500px;
  width: 400px;
}
.mid-card{
  display: flex;
  justify-content: space-around;
  margin-top: 100px;
  left: 0;right: 0;
}
.mid-card .icon{
  font-size: 30px;
  color: wheat;
}
.process-card{
  margin-top: 30px;
}
.music-time{
  float: left;
  color: wheat;
}
.bottom-card{
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  left: 0;right: 0;
}
.bottom-card .icon{
  font-size: 40px;
  color: whitesmoke;
}
.bottom-card .icon1{
  margin-top: -10px;
  font-size: 60px;
  color: whitesmoke;
}
</style>
