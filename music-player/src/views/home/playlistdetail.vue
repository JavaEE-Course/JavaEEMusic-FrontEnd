<template>
  <div class="playlist">
    <div class="playlist-top-card">
      <div class="playlist-img-wrap">
        <img :src="playlistInfo.playlist_picture" alt="">
      </div>
      <div class="playlist-info">
        <div class="playlist-name">
          <div class="tag1">歌单</div>{{playlistInfo.playlist_name}}
          <div class="el-icon-star-on" v-show="followVisible" v-on:click="followAndUnfollow"></div>
          <div class="el-icon-star-off" v-show="unfollowVisible" v-on:click="followAndUnfollow"></div>
        </div>
        <div class="playlist-user-info">
          <div class="playlist-create-time">
            <span>共{{playlistInfo.song_list.length}}首</span>
          </div>
        </div>
        <div class="playAllBtn iconfont icon-play"> 播放全部</div>
        <div class="playlist-desc">
          <span>简介：</span>
          <span :title="playlistInfo.playlist_introduction">{{playlistInfo.playlist_introduction}}</span>
        </div>
      </div>
    </div>
    <div class="playlist-tabs-wrap">
      <el-tabs>
        <el-tab-pane label="歌曲列表">
          <div class="table">
            <el-table :data="songlist"
                      @row-dblclick="play"
                      v-el-table-infinite-scroll="loadMore"
                      infinite-scroll-delay=500
                      infinite-scroll-disabled="noMore">
              <el-table-column prop="song_name" label="音乐标题">
                <template slot-scope="scope">
                  <span style="cursor:pointer;color:#2980b9;">{{scope.row.song_name}}</span>
                  <span class="plus" @click="addToplay(scope.row.song_id)">+</span>
                </template>
              </el-table-column>
              <el-table-column prop="singer_name" label="歌手"></el-table-column>
              <el-table-column prop="album_name" label="专辑" >
                <template slot-scope="scope">
                  <span style="cursor:pointer;color:#04588e;" @click="toAlbum(scope.row.album_id)">{{scope.row.album_name}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getplaylistdetailAPI } from '@/api/getplaylistdetail'
import {getSongDetailAPI} from '../../api/getsonglist'
export default {
  created () {
    var parm = {
      'playlist_id': this.$route.query.id
    }
    getplaylistdetailAPI(parm).then(res => {
      this.playlistInfo = res.data.data
      this.songlist = res.data.data.song_list
      console.log(this.songlist)
    })
  },
  data () {
    return {
      playlistInfo: {},
      songlist: [],
      followVisible: false,
      unfollowVisible: true
    }
  },
  methods: {
    toAlbum (id) {
      this.$router.push(`/index/albumdetail?id=${id}`)
    },
    addToplay (songid) {
      console.log(songid)
      const songId = {'song_id': songid}
      // 获取歌曲详细信息
      getSongDetailAPI(songId).then(res => {
        console.log(res)
        // 需要的内容：
        // 歌曲本身
        // 歌曲ID
        // 封面路径 cover_path
        // 歌曲路径 song_path
        let list = []
        let songInfo = res.data.data
        songInfo['song_id'] = songid
        list.push(songInfo)
        list.push(songid)
        list.push(res.data.data.cover_path)
        list.push(res.data.data.song_path)
        list.push(res.data.data.song_name)
        this.$store.commit('setNewMusicInfo', list)
        this.$message({
          message: '已成功添加到播放列表',
          type: 'success'
        })
      })
    },
    followAndUnfollow () {
      // TODO:收藏可取消收藏歌单
      // const followList = {'id': window.sessionStorage.getItem('userID'), 'singerId': Number(this.$route.query.id)}
      if (this.followVisible === true) {
        console.log('呵呵')
        // 已关注，需要取关
        this.followVisible = false
        this.unfollowVisible = true
        this.$message({
          message: '已取消收藏歌单',
          type: 'error'
        })
      } else if (this.unfollowVisible === true) {
        console.log('哈哈')
        // 没有关注，需要关注
        this.unfollowVisible = false
        this.followVisible = true
        this.$message({
          message: '已成功收藏歌单',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>
  /deep/.el-table, .el-table tr, .el-table td, .el-table th {
    background-color: transparent!important;
  }
  .table /deep/ .el-table th {
    background-color: transparent!important;
  }

  .table /deep/ .el-table tr {
    background-color: transparent!important;
  }
  .table /deep/.el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
  }
  .plus {
    padding: 10px;
    border-radius: 50%;
    margin-left: 10px;
    top: 0;
    font-size: 25px;
    position: absolute;
    font-weight: bold;
    cursor: pointer;
  }
.playlist {
max-width: 1300px;
margin: 0 auto;
padding: 20px;
}

.playlist-top-card {
display: flex;
}

.playlist-img-wrap {
width: 200px;
height: 200px;
}

.playlist-img-wrap img {
width: 100%;
height: 100%;
}

.playlist-info {
padding: 0 20px;
flex: 1;
}

.playlist-info .tag1 {
color: #2e0f6d;
border: 1px solid #2e0f6d;
display: inline-block;
font-size: 20px;
margin-right: 10px;
border-radius: 5px;
padding: 0px 7px;
cursor: default;
}

.playlist-name {
font-size: 25px;
font-weight: 600;
display: flex;
align-items: center;
}

.playlist-user-info {
display: flex;
align-items: center;
font-size: 14px;
}

.playAllBtn {
display: inline-block;
margin-right: 740px;
margin-top: 7px;
border-radius: 20px;
background: #2e0f6d;
padding: 3px 22px;
color: #fff;
font-size: 20px;
}

.playlist-desc {
display: flex;
align-items: center;
margin-top: 7px;
}
.playlist-desc span:nth-of-type(2){
font-size: 14px;
}

.playlist-tabs-wrap {
margin-top: 20px;
}

.el-table td, .el-table th.is-leaf {
border-bottom: none;
}

.el-table::before {
opacity: 0;
}

.songs-table {
width: 100%;
}

/* 设置滚动条样式 */
  /* 滚动条整体样式 */
  .songs-table>>>::-webkit-scrollbar{
    width: 5px;
    height: 1px;
  }
  /* 滚动条里面的小方块 */
  .songs-table>>>::-webkit-scrollbar-thumb{
    border-radius: 4px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #f2f2f2;
  }
  /* 滚动条里面的轨道 选择不显示 */
  .songs-table>>>::-webkit-scrollbar-track{
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background: #fff;
  }

  .img-wrap {
    width: 60px;
    height: 60px;
    position: relative;
  }

  .img-wrap img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .img-wrap p::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 30px;
    height: 30px;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #c0392b;
    font-size: 14px;
    cursor: pointer;
  }
</style>
