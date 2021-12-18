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
            <!--歌手测试-->
            <div class="discover">
              <div class="songs-wrap">
                <div class="list">
                  <ul style="margin-left: -35px">
                    <li v-on:mouseover="changeActive(item)" v-on:mouseout="removeActive()" v-on:mousemove="updateXY()" class=" icon-play" v-for="(item,index) in allPageList[allPageNumber]" :key="index">
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
          <el-tab-pane label="男歌手" name="second"></el-tab-pane>
          <el-tab-pane label="女歌手" name="third"></el-tab-pane>
          <el-tab-pane label="组合歌手" name="fourth"></el-tab-pane>
        </el-tabs>

      <!--分页符-->
      <el-pagination
        background
        @current-change="handlePageChange"
        layout="prev, pager, next"
        :page-size = "10"
        :current-page.sync = "currentPage"
        :total="singerList.length"
        class="footer" id="footer">
      </el-pagination>
      </div>
</template>

<script>
import { getsingerAPI } from '@/api/getsinger'
export default {
  data () {
    return {
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
      // 所有歌手
      allPageList: [],
      allPageNumber: 0
      // 男歌手
      // 女歌手
      // 组合歌手
    }
  },
  created () {
    // 确定所有演员
    getsingerAPI().then(res => {
      this.singerList = res.data.data
      this.loading = false
      let pageData = []
      for (let i = 0; i < this.singerList.length; i++) {
        pageData.push(this.singerList[i])
        if (pageData.length % 10 === 0) {
          this.allPageList.push(pageData)
          pageData = []
        }
      }
      this.allPageList.push(pageData)
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
  bottom:10px;
  left: 43%;
}
</style>
