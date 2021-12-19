<template>
    <div>
        <!--悬浮框-->
        <div v-show="messageVisible" class="hover_con" :style="positionStyle">
            <div style="margin-top: 3px;color: #6A5ACD" >  {{singerInfo}}</div>
            <img :src="singerPhoto" alt="rec" style="height: 140px;margin-top: 3px;filter: drop-shadow(8px 8px 10px mediumpurple);">
        </div>
        <!--歌手列表-->
        <el-tabs v-model="activeName" style="margin-top: 10px;margin-left: 10px;margin-right: 10px;" @tab-click="handleTabClick">
          <el-tab-pane label="全部歌手" name="first" >
            <div class="discover">
              <div class="songs-wrap">
                <div class="list">
                  <ul style="margin-left: -35px">
                    <li  v-on:click="toSingerDetail(item.id)" v-on:mouseover="changeActive(item)" v-on:mouseout="removeActive()" v-on:mousemove="updateXY()"
                        class=" icon-play" v-for="(item,index) in allPageList[allPageNumber]" :key="index">
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
          <el-tab-pane label="男歌手" name="second">
            <div class="discover">
              <div class="songs-wrap">
                <div class="list">
                  <ul style="margin-left: -35px">
                    <li  v-on:click="toSingerDetail(item.id)" v-on:mouseover="changeActive(item)" v-on:mouseout="removeActive()" v-on:mousemove="updateXY()"
                         class=" icon-play" v-for="(item,index) in malePageList[malePageNumber]" :key="index">
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
          <el-tab-pane label="女歌手" name="third">
            <div class="discover">
              <div class="songs-wrap">
                <div class="list">
                  <ul style="margin-left: -35px">
                    <li  v-on:click="toSingerDetail(item.id)" v-on:mouseover="changeActive(item)" v-on:mouseout="removeActive()" v-on:mousemove="updateXY()"
                         class=" icon-play" v-for="(item,index) in femalePageList[femalePageNumber]" :key="index">
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
          <el-tab-pane label="组合歌手" name="fourth">
            <div class="discover">
              <div class="songs-wrap">
                <div class="list">
                  <ul style="margin-left: -35px">
                    <li  v-on:click="toSingerDetail(item.id)" v-on:mouseover="changeActive(item)" v-on:mouseout="removeActive()" v-on:mousemove="updateXY()"
                         class=" icon-play" v-for="(item,index) in groupPageList[groupPageNumber]" :key="index">
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
        class="footer" id="footer">
      </el-pagination>
      </div>
</template>

<script>
import { getsingerAPI } from '@/api/getsinger'
export default {
  data () {
    return {
      // 加载
      loading: true,
      // 隐藏信息栏
      singerInfo: '',
      singerPhoto: '',
      messageVisible: false,
      x: 0,
      y: 0,
      positionStyle: {top: '20px', left: '20px'},
      singerNameVisible: false,
      // 歌手列表相关
      singerList: [],
      activeName: 'first',
      currentPage: 0,
      maleSingerList: [],
      femaleSingerList: [],
      groupSingerList: [],
      totalPageNumber: 0,
      // 所有歌手
      allPageList: [],
      allPageNumber: 0,
      // 男歌手
      malePageList: [],
      malePageNumber: 0,
      // 女歌手
      femalePageList: [],
      femalePageNumber: 0,
      // 组合歌手
      groupPageList: [],
      groupPageNumber: 0
    }
  },
  created () {
    // 确定所有演员
    getsingerAPI().then(res => {
      this.singerList = res.data.data
      this.loading = false
      this.totalPageNumber = this.getTotalPage()
      let pageData = []
      // 确定歌手组合
      for (let i = 0; i < this.singerList.length; i++) {
        if (this.singerList[i].type === '男') {
          this.maleSingerList.push(this.singerList[i])
        } else if (this.singerList[i].type === '女') {
          this.femaleSingerList.push(this.singerList[i])
        } else if (this.singerList[i].type === '组合') {
          this.groupSingerList.push(this.singerList[i])
        }
      }
      // 所有歌手分页
      // 所有歌手
      for (let i = 0; i < this.singerList.length; i++) {
        pageData.push(this.singerList[i])
        if (pageData.length % 10 === 0) {
          this.allPageList.push(pageData)
          pageData = []
        }
      }
      this.allPageList.push(pageData)
      // 男歌手
      pageData = []
      for (let i = 0; i < this.maleSingerList.length; i++) {
        pageData.push(this.maleSingerList[i])
        if (pageData.length % 10 === 0) {
          this.malePageList.push(pageData)
          pageData = []
        }
      }
      this.malePageList.push(pageData)
      // 女歌手
      pageData = []
      for (let i = 0; i < this.femaleSingerList.length; i++) {
        pageData.push(this.femaleSingerList[i])
        if (pageData.length % 10 === 0) {
          this.femalePageList.push(pageData)
          pageData = []
        }
      }
      this.femalePageList.push(pageData)
      // 组合歌手
      pageData = []
      for (let i = 0; i < this.groupSingerList.length; i++) {
        pageData.push(this.groupSingerList[i])
        if (pageData.length % 10 === 0) {
          this.groupPageList.push(pageData)
          pageData = []
        }
      }
      this.groupPageList.push(pageData)
    })
  },
  methods: {
    changeActive (item) {
      this.singerInfo = item.name
      this.singerPhoto = item.url
      this.messageVisible = true
    },
    removeActive () {
      this.singerInfo = ''
      this.singerPhoto = ''
      this.messageVisible = false
    },
    updateXY () {
      const height = screen.height
      this.x = event.pageX
      this.y = event.pageY
      if (this.y + 348 > height) {
        this.positionStyle = {top: this.y - 220 + 'px', left: this.x - 75 + 'px'}
      } else {
        this.positionStyle = {top: this.y + 40 + 'px', left: this.x - 75 + 'px'}
      }
    },
    handleTabClick () {
      if (this.activeName !== 'first') {
        this.allPageNumber = 0
      }
      if (this.activeName !== 'second') {
        this.malePageNumber = 0
      }
      if (this.activeName !== 'third') {
        this.femalePageNumber = 0
      }
      if (this.activeName !== 'fourth') {
        this.groupPageNumber = 0
      }
      this.totalPageNumber = this.getTotalPage()
      this.currentPage = 1
    },
    handlePageChange: function (val) {
      if (this.activeName === 'first') {
        this.allPageNumber = val - 1
      } else if (this.activeName === 'second') {
        this.malePageNumber = val - 1
      } else if (this.activeName === 'third') {
        this.femalePageNumber = val - 1
      } else if (this.activeName === 'fourth') {
        this.groupPageNumber = val - 1
      }
    },
    toSingerDetail (id) {
      this.$router.push(`/index/singerDetail?id=${id}`)
    },
    getTotalPage () {
      if (this.activeName === 'first') {
        return this.singerList.length
      } else if (this.activeName === 'second') {
        return this.maleSingerList.length
      } else if (this.activeName === 'third') {
        return this.femaleSingerList.length
      } else if (this.activeName === 'fourth') {
        return this.groupSingerList.length
      } else {
        return 0
      }
    }
  }
}
</script>

<style scoped>
.discover {
  max-width: 1300px;
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
.hover_con{
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
