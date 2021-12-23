<template>
  <div>
    <!--背景图片-->
    <div class="Img_Box">
      <img :src="cover" width="100%" height="100%" />
    </div>
    <!--歌曲信息-->
    <div style="display: flex;flex-direction: row">
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
        <div v-show="!favoriteVisible">
          <div title="取消收藏"  class="el-icon-star-on icon" @click="favoriteOrNot"></div>
          <div style="color:snow;">取消收藏</div>
        </div>
        <div v-show="favoriteVisible">
          <div title="收藏" class="el-icon-star-off icon" @click="favoriteOrNot"></div>
          <div style="color:snow;">收藏</div>
        </div>
        <div>
          <div title="查看评论" class="el-icon-chat-dot-round icon" @click="checkComment"></div>
          <div style="margin-top: 5px;color: snow">{{commentNumber}}</div>
        </div>
        <div>
          <div title="查看评分" class="el-icon-bell icon" @click="checkScore"></div>
          <div style="color:snow;">{{songScore}}</div>
        </div>
        <div v-show="!followVisible">
          <div title="取消关注"  class="el-icon-star-on icon" @click="followAndUnfollow"></div>
          <div style="color:snow;">取消关注</div>
        </div>
        <div v-show="followVisible">
          <div title="关注歌手" class="el-icon-star-off icon" @click="followAndUnfollow"></div>
          <div style="color:snow;">关注歌手</div>
        </div>
      </div>
    </el-card>
    <!--右侧歌词信息-->
    <el-card class="lyrics-card" style="color:snow;">
        <ul style="margin-top: 5px;height: 100px;list-style-type: none">
          <li style="text-align: center" v-for="item in topLyricList" :key="item">
            {{ item }}
          </li>
        </ul>
      <ul style="margin-top: 50px;list-style-type: none">
        <li  class="current-lyric">{{currentLyrics}}</li>
      </ul>
      <ul style="margin-top:20px;height: 100px;list-style-type: none">
        <li style="text-align: center" v-for="item in bottomLyricList" :key="item">
          {{ item }}
        </li>
      </ul>
    </el-card>
     <!--其他信息-->
      <!--收藏歌曲到某个歌单-->
      <el-dialog
        title="收藏歌曲"
        :visible.sync="favoriteDialogVisible"
        width="30%">
        <div class="block">
          <span class="demonstration">收藏歌曲</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="favoriteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleFavorite">确 定</el-button>
        </span>
      </el-dialog>
      <!--查看歌曲评论-->
      <el-dialog
        title="歌曲评论"
        :visible.sync="commentVisible"
        width="30%">
        <div class="block">
          <span class="demonstration">查看评论</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="commentVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleComment">确 定</el-button>
        </span>
      </el-dialog>
      <!--歌曲评分-->
      <el-dialog
        title="歌曲评分"
        :visible.sync="scoreVisible"
        width="30%">
        <div class="block">
          <span class="demonstration">请给出您的评分</span>
          <el-rate
            v-model="myScore"
            :colors="colors">
          </el-rate>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="scoreVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitScore">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSongDetailAPI } from '../../api/getsonglist'
import {followAndUnfollowAPI, getFollowSingerAPI} from '../../api/getsinger'

export default {
  name: 'PlayMusic',
  data () {
    return {
      music: '',
      cover: '',
      songName: '',
      singerName: '',
      singerId: '',
      albumName: '',
      songScore: '暂无评分',
      commentNumber: 0,
      playProcess: 80,
      musicTime: '3:21',
      songId: 0,
      // 组件可见性
      favoriteVisible: true,
      followVisible: true,
      playVisible: true,
      scoreVisible: false,
      commentVisible: false,
      favoriteDialogVisible: false,
      tag: 0,
      // 定时器
      timer: '',
      lyricTimer: '',
      // 歌词相关
      lyrics: '',
      lyricsTimeList: [],
      currentLyrics: '',
      topLyricList: ['', '', '', '', ''],
      bottomLyricList: ['', '', '', '', ''],
      // 评分相关
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      myScore: null
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) {
      this.$router.push({ path: '/login' })
    }
    const songId = {'song_id': this.$store.getters.getCurrentSongId}
    this.songId = this.$store.getters.getCurrentSongId
    // 接收歌曲详细信息
    getSongDetailAPI(songId).then(res => {
      this.music = res.data.data.song_path
      this.cover = res.data.data.cover_path
      this.songName = res.data.data.song_name
      this.singerName = res.data.data.singer_name
      this.singerId = res.data.data.singer_id
      this.albumName = res.data.data.album_name
      this.commentNumber = res.data.data.comment_number
      this.songScore = isNaN(res.data.data.song_Score) ? '暂无' : res.data.data.song_Score
      this.lyrics = res.data.data.lyrics_path
      this.lyricsTimeList = []
      this.handleLyrics()
    })
  },
  mounted () {
    this.timer = setInterval(this.changeSong, 600)
    this.lyricsTimer = setInterval(this.changeLyric, 200)
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
    } else if (this.lyricTimer) {
      clearInterval(this.lyricsTimer)
    }
  },
  methods: {
    // 收藏歌曲
    handleFavorite () {
      this.favoriteDialogVisible = false
    },
    // 查看评论
    handleComment () {
      this.commentVisible = false
    },
    // 提交评分
    submitScore () {
      console.log(this.myScore)
      this.scoreVisible = false
    },
    // 自动切换歌词
    changeLyric () {
      const time = this.$store.getters.getCurrentTime
      for (let i = 0; i < this.lyricsTimeList.length; i++) {
        if (Math.abs(this.lyricsTimeList[i] - time) <= 0.1) {
          this.topLyricList = []
          this.bottomLyricList = []
          this.currentLyrics = this.lyrics[i]
          // 显示上边的歌词
          let start, end
          if (i - 5 < 0) start = 0
          else start = i - 5
          // 显示下边的歌词
          if (i + 5 >= this.lyricsTimeList.length) end = this.lyricsTimeList.length - 1
          else end = i + 5
          for (let k = start; k < i; k++) this.topLyricList.push(this.lyrics[k])
          for (let k = i + 1; k <= end; k++) this.bottomLyricList.push(this.lyrics[k])
          break
        }
      }
    },
    // 删除空字符串
    deleteEmptyString (rayLyrics) {
      let lyrics = []
      for (let i = 0; i < rayLyrics.length; i++) {
        if (rayLyrics[i].length !== 0) {
          lyrics.push(rayLyrics[i])
        }
      }
      return lyrics
    },
    // 分离出时间, 并计算出时间
    spiltTime (lyricList) {
      let res = []
      // 分离时间
      for (let i = 0; i < lyricList.length; i++) {
        let temp = lyricList[i].split(']')
        if (temp[1] !== '\n') {
          this.lyricsTimeList.push(temp[0])
          res.push(temp[1].split('\n')[0].replace(/^\s*|\s*$/g, ''))
        }
      }
      // 计算时间
      let timeList = []
      for (let i = 0; i < this.lyricsTimeList.length; i++) {
        let time = 0
        // 筛选分钟
        const minutes = Number(this.lyricsTimeList[i].split(':')[0])
        // 筛选秒
        const seconds = Number(this.lyricsTimeList[i].split(':')[1])
        time = minutes * 60 + seconds
        timeList.push(time)
      }
      this.lyricsTimeList = timeList
      return res
    },
    // 处理歌词
    handleLyrics () {
      let lyrics = this.lyrics.split('[')
      // 删除空字符串
      lyrics = this.deleteEmptyString(lyrics)
      // 分隔出时间
      lyrics = this.spiltTime(lyrics)
      this.lyrics = lyrics
    },
    // 自动判断切歌
    changeSong () {
      if (this.$store.getters.getCurrentSongId !== this.songId) {
        const songId = {'song_id': this.$store.getters.getCurrentSongId}
        this.songId = this.$store.getters.getCurrentSongId
        this.$store.commit('setCurrentSongId', songId)
        getSongDetailAPI(songId).then(res => {
          this.music = res.data.data.song_path
          this.cover = res.data.data.cover_path
          this.songName = res.data.data.song_name
          this.singerName = res.data.data.singer_name
          this.singerId = res.data.data.singer_id
          this.albumName = res.data.data.album_name
          this.commentNumber = res.data.data.comment_number
          this.songScore = isNaN(res.data.data.song_Score) ? '暂无评分' : res.data.data.song_Score
          this.lyrics = res.data.data.lyrics_path
          this.lyricsTimeList = []
          this.handleLyrics()
        })
      }
      if (this.tag === 0){
        // 判断是否关注这个歌手
        const userId = {'userId': window.sessionStorage.getItem('userID')}
        getFollowSingerAPI(userId).then(res => {
          const singerList = res.data.data
          let tag = false
          for (let i = 0; i < singerList.length; i++) {
            if (singerList[i].id === this.singerId) {
              // 确实关注了这个歌手
              tag = true
              this.followVisible = false
              break
            }
          }
          if (!tag) {
            this.followVisible = true
          }
          this.tag = 1
        })
      }
    },
    // 关注歌手
    followAndUnfollow () {
      const followList = {'id': window.sessionStorage.getItem('userID'), 'singerId': this.singerId}
      // 没有关注，需要关注
      if (this.followVisible) {
        this.followVisible = false
        this.$message({
          message: '已成功关注歌手',
          type: 'success'
        })
        followAndUnfollowAPI(followList).then(res => {
        })
      } else {
        // 已经关注，需要取关
        this.followVisible = true
        this.$message({
          message: '已取消关注歌手',
          type: 'error'
        })
        followAndUnfollowAPI(followList).then(res => {
        })
      }
    },
    // 查看评分
    checkScore () {
      this.scoreVisible = true
    },
    // 查看评论
    checkComment () {
      this.commentVisible = true
    },
    // 收藏或取消收藏
    favoriteOrNot () {
      this.favoriteDialogVisible = true
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
.current-lyric {
  text-align: center;
  font-size: 25px;
  font-weight: 550;
  color: wheat;
  text-shadow: 0.1em 0.1em 0.2em black;
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
.lyrics-card{
  background: transparent;
  margin-left: 250px;
  height: 370px;
  max-height: 370px;
  width: 400px;
  max-width: 400px;
}
.card{
  background: transparent;
  margin-left: 150px;
  height: 370px;
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
</style>
