<template>
  <div>
    <el-carousel class="swiper-container" :interval="4000" type="card" height="280px">
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item.picImg"/>
      </el-carousel-item>
    </el-carousel>
    <div class="section">
      <div class="section-title">歌单</div>
      <content-list :contentList="songList" path="song-list-album"></content-list>
    </div>
  </div>
</template>

<script>
import { swiperList } from '../../assets/data/swiper'
import { getsonglistAPI } from '@/api/getsonglist'
export default {
  created () {
    // 获取歌单列表
    this.getSongList()
    // 获取歌手列表
    this.getSingerList()
  },
  data () {
    return {
      swiperList: swiperList // 轮播图列表
    }
  },
  methods: {
    getSongList () {
      console.log('nikanzhelihaopiaoliang')
      let parm = {
        'user_id': 1
      }
      getsonglistAPI(parm).then(res => {
        console.log('res:::::::' + res)
      })
    }
  }
}
</script>
<style scoped>
  .swiper-container {
    width: 90%;
    margin: auto;
  }
  .section {
    width: 100%;
    padding: 0 120px 0px 120px;
    box-sizing: border-box;
  }
  .section-title {
    height: 50px;
    line-height: 60px;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    color: white;
    box-sizing: border-box;
    text-shadow: 0 0 5px white,0 0 10px #d1acec,0 0 15px #ac9ede,0 0 20px #ffffff;
  }
</style>
