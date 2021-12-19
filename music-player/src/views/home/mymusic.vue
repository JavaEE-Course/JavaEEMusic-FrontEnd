<template>
<div>
  <!--悬浮框-->
  <!--专辑悬浮窗-->
  <div v-show="playListVisible" class="hover_playlist" :style="playListPositionStyle">
    <div style="margin-top: 3px;color: #6A5ACD" >  {{playListInfo}}</div>
    <img :src="playListPhoto" alt="rec" style="height: 140px;margin-top: 3px;filter: drop-shadow(8px 8px 10px mediumpurple);">
  </div>
  <!--歌手悬浮窗-->
  <div v-show="singerVisible" class="hover_playlist" :style="singerPositionStyle">
    <div style="margin-top: 3px;color: #6A5ACD" >  {{singerInfo}}</div>
    <img :src="singerPhoto" alt="rec" style="height: 140px;margin-top: 3px;filter: drop-shadow(8px 8px 10px mediumpurple);">
  </div>
  <!--导航栏-->
  <el-tabs v-model="activeName" style="margin-left: 10px;margin-right: 10px">
    <!--收藏的歌单-->
    <el-tab-pane label="歌单" name="first" style="padding-left: 8px;font-size: 16px">
      <div class="discover" v-loading="loading" style="align: center">
        <div class="songs-wrap">
          <div class="list">
            <ul style="margin-left: -35px">
              <li v-on:mouseover="changePlaylistActive(item)" v-on:mouseout="removePlaylistActive()" v-on:mousemove="updatePlaylistXY()" class=" icon-play" v-for="(item,index) in playListPageList[playListPageNumber]" :key="index" @click="toPlaylistDetail(item.playlist_id)">
                <el-card class="card">
                  <img :src="item.playlist_picture" alt="rec" style="height: 140px;margin-top: -10px" class="img">
                  <div class="word"  style="color: #6A5ACD">{{item.playlist_introduction}}</div>
                </el-card>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="歌手" name="second" style="padding-left: 8px;font-size: 16px">
      <div class="discover" v-loading="loading" style="align: center">
        <div class="songs-wrap">
          <div class="list">
            <ul style="margin-left: -35px">
              <li v-on:mouseover="changeSingerActive(item)" v-on:mouseout="removeSingerActive()" v-on:mousemove="updateSingerXY()" class=" icon-play" v-for="(item,index) in singerPageList[singerPageNumber]" :key="index" @click="toSingerDetail(item.id)">
                <el-card class="card">
                  <img :src="item.url" alt="rec" style="height: 140px;margin-top: -10px" class="img">
                  <div class="word"  style="color: #6A5ACD">{{item.name}}</div>
                </el-card>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
  <!--分页符-->
  <el-pagination
    background
    @current-change="handlePageChange"
    layout="prev, pager, next"
    :page-size = "10"
    :current-page.sync = "currentPage"
    :total.sync= "totalPageNumber"
    class="footer">
  </el-pagination>
</div>
</template>

<script>
import { getmyplaylistAPI } from '../../api/getsonglist'
import { getFollowSingerAPI } from '../../api/getsinger'

export default {
  data () {
    return {
      // 加载
      loading: true,
      // 导航栏
      activeName: 'first',
      // 分页符
      totalPageNumber: 0,
      currentPage: 1,
      playListPageList: [],
      playListPageNumber: 0,
      singerPageList: [],
      singerPageNumber: 0,
      // 歌手
      singerInfo: '',
      singerPhoto: '',
      singerList: [],
      // 歌单
      playListInfo: '',
      playListPhoto: '',
      playList: [],
      // 悬浮窗
      playListVisible: false,
      singerVisible: false,
      playListX: 0,
      playListY: 0,
      singerX: 0,
      singerY: 0,
      playListPositionStyle: {top: '20px', left: '20px'},
      singerPositionStyle: {top: '20px', left: '20px'}
    }
  },
  created () {
    const userId = {'user_id': window.sessionStorage.getItem('userID')}
    const userId2 = {'userId': window.sessionStorage.getItem('userID')}
    // 获取我的歌单
    getmyplaylistAPI(userId).then(res => {
      this.playList = res.data.data
      this.totalPageNumber = this.playList.length
      this.loading = false
      let pageData = []
      for (let i = 0; i < this.playList.length; i++) {
        pageData.push(this.playList[i])
        if (pageData.length % 10 === 0) {
          this.playListPageList.push(pageData)
          pageData = []
        }
      }
      this.playListPageList.push(pageData)
    })
    // 获取关注的歌手
    getFollowSingerAPI(userId2).then(res => {
      this.singerList = res.data.data
      let pageData = []
      for (let i = 0; i < this.singerList.length; i++) {
        pageData.push(this.singerList[i])
        if (pageData.length % 10 === 0) {
          this.singerPageList.push(pageData)
          pageData = []
        }
        this.singerPageList.push(pageData)
      }
    })
  },
  methods: {
    handleTabClick () {
      if (this.activeName !== 'first') {
        this.playListPageNumber = 0
      }
      if (this.activeName !== 'second') {
        this.singerPageNumber = 0
      }
      this.totalPageNumber = this.getTotalPage()
      this.currentPage = 1
    },
    // 分页符
    handlePageChange (val) {
      if (this.activeName === 'first') {
        this.playListPageNumber = val - 1
      }
    },
    getTotalPage () {
      if (this.activeName === 'first') {
        return this.playList.length
      } else if (this.activeName === 'second') {
        return this.singerList.length
      }
    },
    // 专辑
    toPlaylistDetail (id) {
      this.$router.push(`/index/playlistdetail?id=${id}`)
    },
    toSingerDetail (id) {
      this.$router.push(`/index/singerDetail?id=${id}`)
    },
    // 悬浮窗
    // 歌单
    changePlaylistActive (item) {
      this.playListInfo = item.playlist_name
      this.playListPhoto = item.playlist_picture
      this.playListVisible = true
    },
    removePlaylistActive () {
      this.playListInfo = ''
      this.playListPhoto = ''
      this.playListVisible = false
    },
    updatePlaylistXY () {
      const height = screen.height
      this.playListX = event.pageX
      this.playListY = event.pageY
      if (this.playListY + 348 > height) {
        this.playListPositionStyle = {top: this.playListY - 220 + 'px', left: this.playListX - 75 + 'px'}
      } else {
        this.playListPositionStyle = {top: this.playListY + 40 + 'px', left: this.playListX - 75 + 'px'}
      }
    },
    // 歌手
    changeSingerActive (item) {
      this.singerInfo = item.name
      this.singerPhoto = item.url
      this.singerVisible = true
    },
    removeSingerActive () {
      this.singerInfo = ''
      this.singerPhoto = ''
      this.singerVisible = false
    },
    updateSingerXY () {
      const height = screen.height
      this.singerX = event.pageX
      this.singerY = event.pageY
      if (this.singerY + 348 > height) {
        this.singerPositionStyle = {top: this.singerY - 220 + 'px', left: this.singerX - 75 + 'px'}
      } else {
        this.singerPositionStyle = {top: this.singerY + 40 + 'px', left: this.singerX - 75 + 'px'}
      }
    }
  }
}
</script>

<style scoped>
.discover {
  width: 100%;
  padding: 25px;
  box-sizing: border-box;
}
.songs-wrap .list ul{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.songs-wrap .list li {
  width: 18%;
  margin: 0px 0;
  position: relative;
  overflow-y: hidden;
}

.songs-wrap ul img {
  width: 100%;
  border-radius: 5px;
}

.card{
  background-color: transparent;
}
.card:hover{
  filter: blur(5px);
}
.img:hover{
  filter: drop-shadow(8px 8px 10px grey);
}
.word{
  z-index:1000;
}
.hover_playlist{
  z-index:1000;
  position: fixed;
  height: 185px;
  width: 185px;
  border: 1px solid #666;
  background: #ccc;
  border-radius: 25px;
}
.footer{
  position:absolute;
  bottom: 10px;
  margin: auto;
  left: 0;right: 0;
}
</style>
