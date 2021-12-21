<template>
  <div style="margin-left: 160px">
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-1">
            <div class="grid-cont-right">
              <div class="grid-num">{{userCount}}</div>
              <div>用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-2">
            <div class="grid-cont-right">
              <div class="grid-num">{{songListCount}}</div>
              <div>歌单总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-3">
            <div class="grid-cont-right">
              <div class="grid-num">{{singerCount}}</div>
              <div>歌手数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-4">
            <div class="grid-cont-right">
              <div class="grid-num">{{albumCount}}</div>
              <div>专辑数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <h3 style="margin-bottom: 20px">用户性别比例</h3>
        <div class="cav-info" style="background-color: white">
          <ve-pie :data="userSex" :theme="options"></ve-pie>
        </div>
      </el-col>
      <el-col :span="12">
        <h3 style="margin-bottom: 20px">歌单类型分布</h3>
        <div class="cav-info" style="background-color: white">
          <ve-histogram :data="songStyle" :theme="options3"></ve-histogram>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getsingerAPI } from '@/api/getsinger'
import { getallalbumAPI } from '@/api/getallalbum'
import { getalluserAPI } from '@/api/getalluser'
// eslint-disable-next-line standard/object-curly-even-spacing
import { getallplaylistAPI, gettypeplaylistAPI} from '@/api/getallplaylist'
export default {
  created () {
    // 获取所有的用户
    getalluserAPI().then(res => {
      console.log('usercount')
      this.userCount = res.data.data.length
      var list = res.data.data
      for (var i = 0; i < this.userCount; i++) {
        if (list[i].sex === '男') {
          this.userSex.rows[0].总数++
        } else {
          this.userSex.rows[1].总数++
        }
      }
    })
    // 获取所有专辑
    getallalbumAPI().then(res => {
      this.albumCount = res.data.data.length
    })
    // 获取所有歌手
    getsingerAPI().then(res => {
      this.singerCount = res.data.data.length
    })
    // 获取所有的歌单
    getallplaylistAPI().then(res => {
      console.log(res.data.data)
      this.songListCount = res.data.data.length
    })
    // 获取其它类型的歌单的数量
    var parm = {
      'type': '欧美'
    }
    gettypeplaylistAPI(parm).then(res => {
      console.log(res.data.data)
      console.log(this.songStyle.rows[0])
      this.songStyle.rows[0].总数 = res.data.data.length
    })
    var parm1 = {
      'type': '华语'
    }
    gettypeplaylistAPI(parm1).then(res => {
      console.log(res.data.data)
      this.songStyle.rows[1].总数 = res.data.data.length
    })
    var parm2 = {
      'type': '流行'
    }
    gettypeplaylistAPI(parm2).then(res => {
      console.log(res.data.data)
      this.songStyle.rows[2].总数 = res.data.data.length
    })
    var parm3 = {
      'type': '说唱'
    }
    gettypeplaylistAPI(parm3).then(res => {
      console.log(res.data.data)
      this.songStyle.rows[3].总数 = res.data.data.length
    })
    var parm4 = {
      'type': '摇滚'
    }
    gettypeplaylistAPI(parm4).then(res => {
      console.log(res.data.data)
      this.songStyle.rows[4].总数 = res.data.data.length
    })
    var parm5 = {
      'type': '民谣'
    }
    gettypeplaylistAPI(parm5).then(res => {
      console.log(res.data.data)
      this.songStyle.rows[5].总数 = res.data.data.length
    })
    var parm6 = {
      'type': '影视'
    }
    gettypeplaylistAPI(parm6).then(res => {
      console.log(res.data.data)
      this.songStyle.rows[6].总数 = res.data.data.length
    })
  },
  data () {
    return {
      user: [],
      userSex: {
        columns: ['性别', '总数'],
        rows: [
          { '性别': '男', '总数': 0 },
          { '性别': '女', '总数': 0 }
        ]
      },
      options: {
        color: ['#87CEFA', '#FFC0CB']
      },
      options3: {
        color: ['#FD8A61'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      },
      songStyle: {
        columns: ['分格', '总数'],
        rows: [
          { '分格': '欧美', '总数': 0 },
          { '分格': '华语', '总数': 0 },
          { '分格': '流行', '总数': 0 },
          { '分格': '说唱', '总数': 0 },
          { '分格': '摇滚', '总数': 0 },
          { '分格': '民谣', '总数': 0 },
          { '分格': '影视', '总数': 0 }
        ]
      },
      userCount: 0,
      albumCount: 0,
      singerCount: 0,
      songListCount: 0
    }
  },
  methods: {
  }
}
</script>

<style>
  .mgb20 {
    margin-bottom: 20px;
  }
  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .cav-info {
    border-radius: 6px;
    overflow: hidden;
  }
</style>
