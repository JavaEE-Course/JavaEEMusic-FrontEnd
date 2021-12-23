<template>
  <div class="result" v-loading="loading">
    <div class="result-top-info">
      <h2>{{keywords}}</h2>
      <span>共找到{{num}}个结果</span>
    </div>
    <div class="tab-wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲" name="first">
          <div class="songs-table">
            <div class="table">
              <el-table :data="songsList" stripe style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="音乐图片" width="150" align="center">
                  <template slot-scope="scope">
                    <div class="singer-img" style="width: 80px;align-content: center;margin-left: 12px">
                      <img :src= "scope.row.entity.coverPath"  alt="" style="width: 100%;"/>
                    </div>
                  </template>
                </el-table-column>
              <el-table-column prop="entity.name" label="音乐标题" width="">
                <template slot-scope="scope">
                  <span style="cursor:pointer;color:#2980b9;">{{scope.row.entity.name}}</span>
                  <span class="plus" title="添加至歌单" @click="addToplay(scope.row.entity.id)">+</span>
                </template>
              </el-table-column>
              <el-table-column prop="entity.songScore" label="音乐评分" width=""></el-table-column>
            </el-table>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="歌手" name="second">
          <div class="discover" v-loading="loading">
            <div class="songs-wrap">
              <div class="list">
                <ul>
                  <li class="iconfont icon-play" v-for="(item,index) in singerList" :key="index" @click="toSingerDetail(item.entity.id)">
                    <p class="first-p" style="margin-top: 0.3px">{{item.entity.name}}</p>
                    <img :src="item.entity.url" alt="rec" style="height: 140px;margin-top: -10px">
                    <p class="last-p" :title="item.introduction">{{item.entity.introduction}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="third">
          <div class="songs-table">
            <el-table :data="albumList" stripe style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="专辑图片" width="110" align="center">
                <template slot-scope="scope">
                  <div class="singer-img">
                    <img :src= "scope.row.entity.coverPath"  alt="" style="width: 100%;"/>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="entity.name" label="专辑标题" width="">
                <template slot-scope="scope">
                  <span style="cursor:pointer;color:#04588e;" @click="toAlbum(scope.row.entity.id)">{{scope.row.entity.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="entity.introduction" label="专辑介绍" width=""></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script scoped>
import { searchAPI } from '@/api/search'
import {getSongDetailAPI} from '../../api/getsonglist'

export default {
  created () {
    let query = this.$route.query
    this.keywords = query.info
    var parm = {
      'keyword': this.keywords,
      'type': 'song'
    }
    searchAPI(parm).then(res => {
      console.log(res.data.data.song)
      this.songsList = res.data.data.song
      console.log(res.data.data.song.length)
      var l = res.data.data.song.length
      this.num = Number(Number(l) + Number(this.num))
    })
    var parm1 = {
      'keyword': this.keywords,
      'type': 'album'
    }
    searchAPI(parm1).then(res => {
      console.log('album')
      console.log(res.data.data.album)
      this.albumList = res.data.data.album
      console.log(res.data.data.album.length)
      var l = res.data.data.album.length
      this.num = Number(Number(l) + Number(this.num))
    })
    var parm2 = {
      'keyword': this.keywords,
      'type': 'singer'
    }
    searchAPI(parm2).then(res => {
      console.log('asdfghjkl')
      console.log(res.data.data.singer)
      this.singerList = res.data.data.singer
      console.log(res.data.data.singer.length)
      var l = res.data.data.singer.length
      this.num = Number(Number(l) + Number(this.num))
    })
    this.loading = false
  },
  data () {
    return {
      keywords: '',
      num: 0,

      activeName: 'first',
      songsList: [],
      // playList: [],
      albumList: [],
      singerList: [],
      loading: true
    }
  },
  methods: {
    addToplay (songid) {
      const songId = {'song_id': songid}
      // 获取歌曲详细信息
      getSongDetailAPI(songId).then(res => {
        console.log(res)
        // 需要的内容：
        // 歌曲本身
        // 歌曲ID
        // 封面路径 cover_path
        // 歌曲路径 song_path
        let resList = []
        let list = []
        let songInfo = res.data.data
        songInfo['song_id'] = songid
        list.push(songInfo)
        list.push(songid)
        list.push(res.data.data.cover_path)
        list.push(res.data.data.song_path)
        list.push(res.data.data.song_name)
        resList.push(list)
        this.$store.commit('setNewMusicInfo', resList)
        this.$message({
          message: '已成功添加到播放列表',
          type: 'success'
        })
      })
    },
    toSingerDetail (id) {
      this.$router.push(`/index/singerDetail?id=${id}`)
    },
    toAlbum (id) {
      this.$router.push(`/index/albumdetail?id=${id}`)
    },
    handleCurrentChange (page) {
      this.page = page
    }
  }
}
</script>

<style>
  .singer-img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
  }
  .discover {
    max-width: 1300px;
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
  .list li .first-p {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(213, 209, 209, 0.5);
    color: #fff;
    font-size: 20px;
    box-sizing: border-box;
    transform: translateY(-100%);
    transition: .5s;
  }
  .list li::before {
    content: "Go";
    position: absolute;
    bottom: 40px;
    right: 5px;
    width: 30px;
    height: 30px;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7f8980;
    font-size: 15px;
    opacity: 0;
    transition: .3s;
    cursor: pointer;
  }
  .list li:hover .first-p{
    transform: translateY(0);
  }
  .list li:hover::before{
    opacity: 1;
  }
  .songs-wrap ul img {
    width: 100%;
    border-radius: 5px;
    /* opacity: 1; */
  }
  .songs-wrap ul .last-p {
    color: white;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: -5px;
  }
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
  .el-table td, .el-table th.is-leaf {
    border-bottom: none;
  }

  .el-table::before {
    opacity: 0;
  }
  .add-ball {
    position: fixed;
    color: rgb(236, 65, 65);
    transition: top .5s ease-in,left .5s linear;
    z-index: 9999;
  }

  ul {
    list-style: none;
  }

  .result {
    max-width: 1300px;
    margin: 0 auto;
    padding: 20px;
  }

  .result-top-info {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-end;
  }

  .result-top-info span {
    margin-left: 10px;
    font-size: 12px;
    color: grey;
  }

  .el-tabs__active-bar {
    background-color: rgb(236, 65, 65);
  }

  .el-tabs__item.is-active {
    color: #2e0f6d;
  }

  .el-tabs__item {
    font-size: 18px;
  }

  .el-tabs__item:not(.is-active):hover {
    color: #5d2fba;
  }

  .page-wrap {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .plus {
    padding: 45px;
    border-radius: 50%;
    margin-left: 100px;
    font-size: 25px;
    position: absolute;
    left: -80px;
    top: 0;
    font-weight: bold;
    cursor: pointer;
    display: none;
  }

  .songs-table .el-table__row:hover .plus{
    display: block;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #2e0f6d;
  }

  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background: none;
    border-radius: 5px;
    border: 1px solid #f4f4f5;
  }

  .el-pagination.is-background .el-pager li:not(.disabled):not(.active):hover {
    color: #2e0f6d!important;
  }
</style>
