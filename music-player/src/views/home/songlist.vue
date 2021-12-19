<template>
    <div class="recommend">
<!--      // 上部精品歌单-->
      <div class="top-card-wrap">
        <img :src="highQuality.playlist_picture" class="bg-blur" alt="bg-blur">
        <div class="top-card">
          <div class="img-wrap">
            <img :src="highQuality.playlist_picture" alt="img">
          </div>
          <div class="card-content">
            <div class="card-tag">精品歌单</div>
            <div class="card-title">{{highQuality.playlist_name}}</div>
            <div class="card-info">{{highQuality.playlist_introduction}}</div>
          </div>
        </div>
      </div>
<!--      //下部分歌单列表-->
      <el-tabs v-model="activeName" style="margin-left: 10px;margin-right: 10px;margin-top: 10px;" @tab-click="handleTabClick">
        <el-tab-pane label="全部" name="first" >
          <div class="discover" v-loading="loading" style="align: center;margin-top: -30px">
            <div class="songs-wrap">
              <div class="list">
                <ul style="margin-left: -35px">
                  <li v-for="(item,index) in allPageList[allPageNumber]" :key="index" @click="toPlaylistDetail(item.playlist_id)">
                    <p class="first-p" style="margin-top: 0.3px">{{item.playlist_name}}</p>
                    <img :src="item.playlist_picture" alt="rec" style="height: 140px;margin-top: -10px">
                    <p class="last-p" :title="item.playlist_introduction">{{item.playlist_introduction}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="欧美" name="second" ></el-tab-pane>
        <el-tab-pane label="华语" name="third" ></el-tab-pane>
        <el-tab-pane label="流行" name="fourth" ></el-tab-pane>
        <el-tab-pane label="说唱" name="fifth" ></el-tab-pane>
        <el-tab-pane label="摇滚" name="sixth" ></el-tab-pane>
        <el-tab-pane label="民谣" name="seventh" ></el-tab-pane>
        <el-tab-pane label="影视" name="eighth" ></el-tab-pane>

      </el-tabs>
      <el-pagination
        background
        @current-change="handlePageChange"
        layout="prev, pager, next"
        :page-size = "5"
        :current-page.sync = "currentPage"
        :total="playList.length"
        class="footer" id="footer">
      </el-pagination>
    </div>
</template>

<script>
import { getallplaylistAPI } from '@/api/getallplaylist'
export default {
  created () {
    getallplaylistAPI().then(res => {
      console.log(res.data.data)
      this.playList = res.data.data
      this.highQuality = this.playList[0]
      this.loading = false
      let pageData = []
      for (let i = 0; i < this.playList.length; i++) {
        pageData.push(this.playList[i])
        if (pageData.length % 5 === 0) {
          this.allPageList.push(pageData)
          pageData = []
        }
      }
      this.allPageList.push(pageData)
    })
  },
  data () {
    return {
      // 歌单列表相关
      playList: [],
      highQuality: [],
      loading: true,
      activeName: 'first',
      currentPage: 0,
      // 所有歌单
      allPageList: [],
      allPageNumber: 0
      // 其它歌单
    }
  },
  methods: {
    toPlaylistDetail (id) {
      this.$router.push(`/index/playlistdetail?id=${id}`)
    },
    handleTabClick () {
      if (this.activeName !== 'first') {
        this.allPageNumber = 0
        this.currentPage = 1
      }
    },
    handlePageChange: function (val) {
      if (this.activeName === 'first') {
        this.allPageNumber = val - 1
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    padding: 10px 20px 0px 20px;
  }

  .top-card-wrap {
    height: 250px;
    padding: 20px;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .bg-blur {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(20px);
    z-index: 2;
  }

  .top-card {
    display: flex;
    position: absolute;
    z-index: 3;
  }

  .img-wrap {
    width: 200px;
    height: 200px;
  }

  .img-wrap img {
    width: 100%;
    height: 100%;
  }

  .card-content {
    flex: 1;
    padding: 0 20px;
  }

  .card-tag {
    padding: 5px;
    width: 100px;
    box-sizing: border-box;
    border: 1px solid #2e0f6d;
    color: #2e0f6d;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
  }

  .card-title {
    color: #fff;
    margin: 10px 0;
  }

  .card-info {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
    /* color: #888482; */
    color: #e3e3e3;
  }
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
    color: #7c867d;
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
  .footer{
    position:absolute;
    bottom: 10px;
    margin: auto;
    left: 0;right: 0;
  }
</style>
