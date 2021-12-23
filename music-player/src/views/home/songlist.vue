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
        <el-tab-pane label="欧美" name="second" >
          <div class="discover" v-loading="loading" style="align: center;margin-top: -30px">
            <div class="songs-wrap">
              <div class="list">
                <ul style="margin-left: -35px">
                  <li v-for="(item,index) in oumeiPageList[oumeiPageNumber]" :key="index" @click="toPlaylistDetail(item.playlist_id)">
                    <p class="first-p" style="margin-top: 0.3px">{{item.playlist_name}}</p>
                    <img :src="item.playlist_picture" alt="rec" style="height: 140px;margin-top: -10px">
                    <p class="last-p" :title="item.playlist_introduction">{{item.playlist_introduction}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="华语" name="third" >
          <div class="discover" v-loading="loading" style="align: center;margin-top: -30px">
            <div class="songs-wrap">
              <div class="list">
                <ul style="margin-left: -35px">
                  <li v-for="(item,index) in huayuPageList[huayuPageNumber]" :key="index" @click="toPlaylistDetail(item.playlist_id)">
                    <p class="first-p" style="margin-top: 0.3px">{{item.playlist_name}}</p>
                    <img :src="item.playlist_picture" alt="rec" style="height: 140px;margin-top: -10px">
                    <p class="last-p" :title="item.playlist_introduction">{{item.playlist_introduction}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="流行" name="fourth" >
          <div class="discover" v-loading="loading" style="align: center;margin-top: -30px">
            <div class="songs-wrap">
              <div class="list">
                <ul style="margin-left: -35px">
                  <li v-for="(item,index) in liuxingPageList[liuxingPageNumber]" :key="index" @click="toPlaylistDetail(item.playlist_id)">
                    <p class="first-p" style="margin-top: 0.3px">{{item.playlist_name}}</p>
                    <img :src="item.playlist_picture" alt="rec" style="height: 140px;margin-top: -10px">
                    <p class="last-p" :title="item.playlist_introduction">{{item.playlist_introduction}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="说唱" name="fifth" >
          <div class="discover" v-loading="loading" style="align: center;margin-top: -30px">
            <div class="songs-wrap">
              <div class="list">
                <ul style="margin-left: -35px">
                  <li v-for="(item,index) in shuochangPageList[shuochangPageNumber]" :key="index" @click="toPlaylistDetail(item.playlist_id)">
                    <p class="first-p" style="margin-top: 0.3px">{{item.playlist_name}}</p>
                    <img :src="item.playlist_picture" alt="rec" style="height: 140px;margin-top: -10px">
                    <p class="last-p" :title="item.playlist_introduction">{{item.playlist_introduction}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="摇滚" name="sixth" >
          <div class="discover" v-loading="loading" style="align: center;margin-top: -30px">
            <div class="songs-wrap">
              <div class="list">
                <ul style="margin-left: -35px">
                  <li v-for="(item,index) in yaogunPageList[yaogunPageNumber]" :key="index" @click="toPlaylistDetail(item.playlist_id)">
                    <p class="first-p" style="margin-top: 0.3px">{{item.playlist_name}}</p>
                    <img :src="item.playlist_picture" alt="rec" style="height: 140px;margin-top: -10px">
                    <p class="last-p" :title="item.playlist_introduction">{{item.playlist_introduction}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="民谣" name="seventh" >
          <div class="discover" v-loading="loading" style="align: center;margin-top: -30px">
            <div class="songs-wrap">
              <div class="list">
                <ul style="margin-left: -35px">
                  <li v-for="(item,index) in minyaoPageList[minyaoPageNumber]" :key="index" @click="toPlaylistDetail(item.playlist_id)">
                    <p class="first-p" style="margin-top: 0.3px">{{item.playlist_name}}</p>
                    <img :src="item.playlist_picture" alt="rec" style="height: 140px;margin-top: -10px">
                    <p class="last-p" :title="item.playlist_introduction">{{item.playlist_introduction}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="影视" name="eighth" >
          <div class="discover" v-loading="loading" style="align: center;margin-top: -30px">
            <div class="songs-wrap">
              <div class="list">
                <ul style="margin-left: -35px">
                  <li v-for="(item,index) in yingshiPageList[yingshiPageNumber]" :key="index" @click="toPlaylistDetail(item.playlist_id)">
                    <p class="first-p" style="margin-top: 0.3px">{{item.playlist_name}}</p>
                    <img :src="item.playlist_picture" alt="rec" style="height: 140px;margin-top: -10px">
                    <p class="last-p" :title="item.playlist_introduction">{{item.playlist_introduction}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>

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
// eslint-disable-next-line standard/object-curly-even-spacing
import { getallplaylistAPI, gettypeplaylistAPI} from '@/api/getallplaylist'
export default {
  created () {
    getallplaylistAPI().then(res => {
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
    // 获取其它类型的歌单的数量
    var parm7 = {
      'type': '欧美'
    }
    gettypeplaylistAPI(parm7).then(res => {
      this.oumeiList = res.data.data
      this.loading = false
      var pageData = []
      for (let i = 0; i < this.oumeiList.length; i++) {
        pageData.push(this.oumeiList[i])
        if (pageData.length % 5 === 0) {
          this.oumeiPageList.push(pageData)
          pageData = []
        }
      }
      this.oumeiPageList.push(pageData)
    })
    var parm1 = {
      'type': '华语'
    }
    gettypeplaylistAPI(parm1).then(res => {
      this.huayuList = res.data.data
      var pageData = []
      for (let i = 0; i < this.huayuList.length; i++) {
        pageData.push(this.huayuList[i])
        if (pageData.length % 5 === 0) {
          this.huayuPageList.push(pageData)
          pageData = []
        }
      }
      this.huayuPageList.push(pageData)
    })
    var parm2 = {
      'type': '流行'
    }
    gettypeplaylistAPI(parm2).then(res => {
      this.liuxingList = res.data.data
      var pageData = []
      for (let i = 0; i < this.liuxingList.length; i++) {
        pageData.push(this.liuxingList[i])
        if (pageData.length % 5 === 0) {
          this.liuxingPageList.push(pageData)
          pageData = []
        }
      }
      this.liuxingPageList.push(pageData)
    })
    var parm3 = {
      'type': '说唱'
    }
    gettypeplaylistAPI(parm3).then(res => {
      this.shuochangList = res.data.data
      var pageData = []
      for (let i = 0; i < this.shuochangList.length; i++) {
        pageData.push(this.shuochangList[i])
        if (pageData.length % 5 === 0) {
          this.shuochangPageList.push(pageData)
          pageData = []
        }
      }
      this.shuochangPageList.push(pageData)
    })
    var parm4 = {
      'type': '摇滚'
    }
    gettypeplaylistAPI(parm4).then(res => {
      this.yaogunList = res.data.data
      var pageData = []
      for (let i = 0; i < this.yaogunList.length; i++) {
        pageData.push(this.yaogunList[i])
        if (pageData.length % 5 === 0) {
          this.yaogunPageList.push(pageData)
          pageData = []
        }
      }
      this.yaogunPageList.push(pageData)
    })
    var parm5 = {
      'type': '民谣'
    }
    gettypeplaylistAPI(parm5).then(res => {
      this.minyaoList = res.data.data
      var pageData = []
      for (let i = 0; i < this.minyaoList.length; i++) {
        pageData.push(this.minyaoList[i])
        if (pageData.length % 5 === 0) {
          this.minyaoPageList.push(pageData)
          pageData = []
        }
      }
      this.minyaoPageList.push(pageData)
    })
    var parm6 = {
      'type': '影视'
    }
    gettypeplaylistAPI(parm6).then(res => {
      this.yingshiList = res.data.data
      var pageData = []
      for (let i = 0; i < this.yingshiList.length; i++) {
        pageData.push(this.yingshiList[i])
        if (pageData.length % 5 === 0) {
          this.yingshiPageList.push(pageData)
          pageData = []
        }
      }
      this.yingshiPageList.push(pageData)
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
      allPageNumber: 0,
      totalPageNumber: 0,
      // 其它歌单
      oumeiList: [],
      oumeiPageList: [],
      oumeiPageNumber: 0,
      huayuList: [],
      huayuPageList: [],
      huayuPageNumber: 0,
      liuxingList: [],
      liuxingPageList: [],
      liuxingPageNumber: 0,
      shuochangList: [],
      shuochangPageList: [],
      shuochangPageNumber: 0,
      yaogunList: [],
      yaogunPageList: [],
      yaogunPageNumber: 0,
      minyaoList: [],
      minyaoPageList: [],
      minyaoPageNumber: 0,
      yingshiList: [],
      yingshiPageList: [],
      yingshiPageNumber: 0
    }
  },
  methods: {
    toPlaylistDetail (id) {
      this.$router.push(`/index/playlistdetail?id=${id}`)
    },
    handleTabClick () {
      if (this.activeName !== 'first') {
        this.allPageNumber = 0
      }
      if (this.activeName !== 'second') {
        this.oumeiPageNumber = 0
      }
      if (this.activeName !== 'third') {
        this.huayuPageNumber = 0
      }
      if (this.activeName !== 'fourth') {
        this.liuxingPageNumber = 0
      }
      if (this.activeName !== 'fifth') {
        this.shuochangPageNumber = 0
      }
      if (this.activeName !== 'sixth') {
        this.yaogunPageNumber = 0
      }
      if (this.activeName !== 'seventh') {
        this.minyaoPageNumber = 0
      }
      if (this.activeName !== 'eighth') {
        this.yingshiPageNumber = 0
      }
      this.totalPageNumber = this.getTotalPage()
      this.currentPage = 1
    },
    handlePageChange: function (val) {
      if (this.activeName === 'first') {
        this.allPageNumber = val - 1
      }
      if (this.activeName === 'second') {
        this.oumeiPageNumber = val - 1
      }
      if (this.activeName === 'third') {
        this.huayuPageNumber = val - 1
      }
      if (this.activeName === 'fourth') {
        this.liuxingPageNumber = val - 1
      }
      if (this.activeName === 'fifth') {
        this.shuochangPageNumber = val - 1
      }
      if (this.activeName === 'sixth') {
        this.yaogunPageNumber = val - 1
      }
      if (this.activeName === 'seventh') {
        this.minyaoPageNumber = val - 1
      }
      if (this.activeName === 'eigth') {
        this.yingshiPageNumber = val - 1
      }
    },
    getTotalPage () {
      if (this.activeName === 'first') {
        return this.playList.length
      } else if (this.activeName === 'second') {
        return this.oumeiList.length
      } else if (this.activeName === 'third') {
        return this.huayuList.length
      } else if (this.activeName === 'fourth') {
        return this.liuxingList.length
      } else if (this.activeName === 'fifth') {
        return this.shuochangList.length
      } else if (this.activeName === 'sixth') {
        return this.yaogunList.length
      } else if (this.activeName === 'seventh') {
        return this.minyaoList.length
      } else if (this.activeName === 'eighth') {
        return this.yingshiList.length
      } else {
        return 0
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
