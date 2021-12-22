<template>
  <div class="result" v-loading="loading">
    <div class="result-top-info">
      <h2>{{keywords}}</h2>
      <span>共找到{{total}}个结果</span>
    </div>
    <div class="tab-wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲" name="first">
          <div class="songs-table">
            <div class="table">
              <el-table :data="songsList" stripe style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="音乐图片" width="110" align="center">
                <template slot-scope="scope">
                  <div class="singer-img">
                    <img :src= "scope.row.cover_path"  alt="" style="width: 100%;"/>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="song_name" label="音乐标题" width="">
                <template slot-scope="scope">
                  <span style="cursor:pointer;color:#2980b9;">{{scope.row.song_name}}</span>
                  <span class="plus" title="添加至歌单" @click="addToplay(scope.row.id)">+</span>
                </template>
              </el-table-column>
              <el-table-column prop="song_score" label="音乐评分" width=""></el-table-column>
              <el-table-column prop="singer_name" label="歌手" width=""></el-table-column>
              <el-table-column prop="album_name" label="专辑" width=""></el-table-column>
            </el-table>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="歌单" name="second">
          <div class="songs-wrap">
            <div class="list">
              <ul>
                <li class="iconfont icon-play" v-for="(item,index) in playList" :key="index" @click="toPlaylistDetail(item.id)">
                  <p class="first-p">{{item.playlist_instruction}}</p>
                  <img v-lazy="item.playlist_picture" alt="recommend">
                  <p class="last-p" :title="item.playlist_name">{{item.playlist_name}}</p>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="歌手" name="third">
          <div class="discover" v-loading="loading">
            <div class="songs-wrap">
              <div class="list">
                <ul>
                  <li class="iconfont icon-play" v-for="(item,index) in singerList" :key="index" @click="toSingerDetail(item.id)">
                    <p class="first-p" style="margin-top: 0.3px">{{item.name}}</p>
                    <img :src="item.url" alt="rec" style="height: 140px;margin-top: -10px">
                    <p class="last-p" :title="item.introduction">{{item.introduction}}</p>
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
                    <img :src= "scope.row.cover_path"  alt="" style="width: 100%;"/>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="album_name" label="专辑标题" width=""></el-table-column>
              <el-table-column prop="singer_name" label="歌手" width=""></el-table-column>
              <el-table-column prop="introduction" label="专辑介绍" width=""></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="page-wrap">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="page">
      </el-pagination>
    </div>
  </div>
</template>

<script scoped>
// import { searchAPI } from '@/api/search'

export default {
  created () {
    let query = this.$route.query
    this.keywords = query.info
    // var parm = {
    //   'keywords': this.keywords
    // }
    // searchAPI(parm).then(res => {
    //   console.log(res.data.data)
    //   this.loading = false
    // })
    this.loading = false
  },
  data () {
    return {
      keywords: '',

      activeName: 'first',
      songsList: [],
      playList: [],
      albumList: [],
      singerList: [],

      page: 1,
      total: 0,
      pageSize: 10,
      type: 1,
      loading: true
    }
  },
  methods: {
    addToplay (id) {
      console.log(id)
    },
    toMvDetail (id) {
      this.$router.push(`/mvdetail?id=${id}`)
    },
    toPlaylistDetail (id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    toArtist (id) {
      this.$router.push(`/artist?artistId=${id}`)
    },
    toAlbum (id) {
      this.$router.push(`/album?id=${id}`)
    },
    handleCurrentChange (page) {
      this.page = page
      this.getTableData(this.type)
    },
    handleClick (tab) {
      let label = tab.label
      switch (label) {
        case '歌曲':
          this.total = 0
          this.page = 1
          this.type = 1
          this.pageSize = 10
          this.getTableData()
          break
        case '歌单':
          this.total = 0
          this.page = 1
          this.type = 1000
          this.pageSize = 10
          this.getTableData(this.type)
          break
        case 'MV':
          this.total = 0
          this.page = 1
          this.type = 1004
          this.pageSize = 12
          this.getTableData(this.type)
          break
      }
    }
  }
}
</script>

<style>
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
    padding: 10px;
    border-radius: 50%;
    margin-left: 10px;
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

  .mvIcon {
    color: #2e0f6d;
    margin-left: 5px;
    cursor: pointer;
  }

  /* 歌单Tab */
  .songs-wrap .list ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .songs-wrap .list li {
    width: 18%;
    margin: 10px 0;
    position: relative;
    overflow-y: hidden;
  }

  .list li .first-p {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;
    font-size: 12px;
    padding: 5px;
    box-sizing: border-box;
    /* border-top-left-radius: 10px;
    border-top-right-radius: 10px; */
    transform: translateY(-100%);;
    transition: .5s;
  }

  .list li::before {
    content: "\e665";
    position: absolute;
    bottom: 25px;
    right: 5px;
    width: 35px;
    height: 35px;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-size: 35px; */
    color: #8e6ad7;
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
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* MVTabs */
  .mv-list1 {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .mv-list1 li {
    width: 23%;
    margin-bottom: 20px;
    margin-right: 20px;
  }

  .mv-img-wrap {
    position: relative;
    cursor: pointer;
  }

  .mv-img-wrap img{
    width: 100%;
    height: 165px;
    border-radius: 5px;
  }

  .mv-img-wrap:hover .play::before {
    opacity: 1;
  }

  .mv-img-wrap .play::before {
    content: "\e665";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 35px;
    height: 35px;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2e0f6d;
    opacity: 0;
    transition: .3s;
    cursor: pointer;
  }

  .play-count{
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
    font-size: 12px;
  }

  .play-count::before {
    margin-right: 5px;
  }

  .mv-duration {
    position: absolute;
    bottom: 10px;
    right: 5px;
    color: #fff;
    font-size: 12px;
  }

  .mv-info p{
    margin: 5px 0;
  }

  .mv-info p.title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mv-info .author{
    color: #a5a1a1;
    font-size: 12px;
  }
</style>
