<template>
<div>
  <!--悬浮框-->
  <!--专辑悬浮窗-->
  <div v-show="playListVisible" class="hover_con" :style="playListPositionStyle">
    <div style="margin-top: 3px;color: #6A5ACD" >  {{singerInfo}}</div>
    <img :src="singerPhoto" alt="rec" style="height: 140px;margin-top: 3px;filter: drop-shadow(8px 8px 10px mediumpurple);">
  </div>
  <!--歌手悬浮窗-->
  <div v-show="singerVisible" class="hover_con" :style="singerPositionStyle">
    <div style="margin-top: 3px;color: #6A5ACD" >  {{singerInfo}}</div>
    <img :src="singerPhoto" alt="rec" style="height: 140px;margin-top: 3px;filter: drop-shadow(8px 8px 10px mediumpurple);">
  </div>
  <!--导航栏-->
  <el-tabs v-model="activeName" style="margin-left: 10px;margin-right: 10px">
    <el-tab-pane label="歌单" name="first" style="padding-left: 8px;font-size: 16px">
      <div class="discover" v-loading="loading" style="align: center">
        <div class="songs-wrap">
          <div class="list">
            <ul style="margin-left: -35px">
              <li class=" icon-play" v-for="(item,index) in playList" :key="index" @click="toPlaylistDetail(item.playlist_id)">
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

    </el-tab-pane>
  </el-tabs>
  <!--分页符-->
  <el-pagination
    background
    @current-change="handlePageChange"
    layout="prev, pager, next"
    :page-size = "10"
    :total="10000"
    class="footer">
  </el-pagination>
</div>
</template>

<script>
import { getmyplaylistAPI } from '../../api/getsonglist'

export default {
  data () {
    return {
      // 导航栏
      activeName: 'first',
      // 分页符
      // 歌手
      // 歌单
      playList: []
      // 悬浮窗
    }
  },
  created () {
    const userId = {'user_id': window.sessionStorage.getItem('userID')}
    // 获取我的歌单
    getmyplaylistAPI(userId).then(res => {
      this.playList = res.data.data
    })
    // 获取关注的歌手
  },
  methods: {
    handlePageChange () {

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
  justify-content: space-between;
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
  bottom:10px;
  left: 43%;
}
</style>
