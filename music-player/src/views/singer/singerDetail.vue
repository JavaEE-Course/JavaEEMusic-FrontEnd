<template>
  <div class="singer">
    <div class="singer-top-card">
      <div class="singer-img-wrap">
        <img :src="singerInfo.url" alt="">
      </div>
      <div class="singer-info">
        <div class="singer-name">
          <div class="tag1">歌手</div>{{singerInfo.name}}
        </div>
        <div class="singer-user-info">
          <div class="singer-create-time">
            <span>共{{singerAlbums.length}}张专辑</span>
          </div>
        </div>
        <div v-on:click="getIntroductionDetail(singerInfo.name, singerInfo.introduction)">
          <el-card style="margin-top: 10px;max-height: 140px;background: transparent">
            <div style="color: #6A5ACD">歌手简介</div>
            <div>{{singerInfo.introduction.slice(0,140)}}...</div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="album-tabs-wrap">
      <el-tabs>
        <el-tab-pane label="专辑列表">
          <div class="table">
            <el-table :data="singerAlbums"
                      @row-dblclick="toPlaylistDetail"
                      infinite-scroll-delay=500
                      infinite-scroll-disabled="noMore"
                      :row-class-name="albumTable">
              <el-table-column prop="index"></el-table-column>
              <el-table-column prop="name" label="专辑名称"></el-table-column>
              <el-table-column label="歌手">{{singerInfo.name}}</el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getSingerDetailAPI } from '@/api/getsinger'

export default {
  name: 'SingerDetail',
  data () {
    return {
      singerInfo: {},
      singerAlbums: []
    }
  },
  created () {
    const singerID = {'singer_id': this.$route.query.id}
    getSingerDetailAPI(singerID).then(res => {
      this.singerInfo = res.data.data
      this.singerAlbums = res.data.data.albums
    })
  },
  methods: {
    toPlaylistDetail (row, event, column) {
      const id = this.singerAlbums[row.row_index].id
      this.$router.push(`/index/playlistdetail?id=${id}`)
    },
    albumTable ({row, rowIndex}) {
      row.index = rowIndex + 1
      row.row_index = rowIndex
    },
    getIntroductionDetail (name, introduction) {
      this.$alert(introduction, name, {
        confirmButtonText: '确定'
      })
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
.singer {
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
}

.singer-top-card {
  display: flex;
}

.singer-img-wrap {
  width: 200px;
  height: 200px;
}

.singer-img-wrap img {
  width: 100%;
  height: 100%;
}

.singer-info {
  padding: 0 20px;
  flex: 1;
}

.singer-info .tag1 {
  color: #2e0f6d;
  border: 1px solid #2e0f6d;
  display: inline-block;
  font-size: 20px;
  margin-right: 10px;
  border-radius: 5px;
  padding: 0px 7px;
  cursor: default;
}

.singer-name {
  font-size: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.singer-user-info {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.singer-desc span:nth-of-type(2){
  /*font-size: 14px;*/
}

.album-tabs-wrap {
  margin-top: 20px;
}

.el-table td, .el-table th.is-leaf {
  border-bottom: none;
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
