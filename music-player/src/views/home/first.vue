<template>
  <div>
    <el-carousel class="swiper-container" :interval="4000" type="card" height="280px">
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item.picImg"/>
      </el-carousel-item>
    </el-carousel>
    <div class="section">
      <div class="section-title">歌单</div>
        <div class="discover" v-loading="loading">
          <div class="songs-wrap">
            <div class="list">
              <ul style="margin-left: -35px">
                <li class="iconfont icon-play" v-for="(item,index) in recommendList" :key="index" @click="toPlaylistDetail(item.id)">
                  <p class="first-p" style="margin-top: 0.3px">{{item.copywriter}}</p>
                  <img :src="item.picUrl" alt="rec" style="height: 140px;margin-top: -10px">
                  <p class="last-p" :title="item.name">{{item.name}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      <div class="section-title">歌手</div>
      <div class="discover" v-loading="loading">
        <div class="songs-wrap">
          <div class="list">
            <ul style="margin-left: -35px">
              <li class="iconfont icon-play" v-for="(item,index) in singerList" :key="index" @click="toSingerDetail(item.id)">
                <p class="first-p" style="margin-top: 0.3px">{{item.name}}</p>
                <img :src="item.url" alt="rec" style="height: 140px;margin-top: -10px">
                <p class="last-p" :title="item.name">{{item.introduction}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiperList } from '../../assets/data/swiper'
import { getmyplaylistAPI, getotherplaylistAPI, getdailyplaylistAPI } from '@/api/getsonglist'
import { getsingerAPI } from '@/api/getsinger'
export default {
  created () {
    // 获取歌单列表
    this.getSongList()
    // 获取歌手列表
    this.getSingerList()
  },
  data () {
    return {
      swiperList: swiperList, // 轮播图列表
      recommendList: [
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/TQGxDmqNiveYlUV.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/TQGxDmqNiveYlUV.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        }
      ],
      singerList: [],
      loading: true
    }
  },
  methods: {
    getSongList () {
      let parm = {
        'user_id': window.sessionStorage.getItem('userID')
      }
      let parm1 = {
        'id': window.sessionStorage.getItem('userID')
      }
      getmyplaylistAPI(parm).then(res => {
        console.log('my')
        console.log(res.data)
      })
      getotherplaylistAPI(parm1).then(res => {
        console.log('getother')
        console.log(res.data)
      })
      getdailyplaylistAPI(parm1).then(res => {
        console.log('daily')
        console.log(res.data)
      })
    },
    getSingerList () {
      getsingerAPI().then(res => {
        console.log(res.data)
        let pageData = res.data.data
        for (let i = 1; i < 6; i++) {
          this.singerList.push(pageData[i])
        }
        this.loading = false
      })
    },
    toSingerDetail (id) {
      this.$router.push(`/index/singerDetail?id=${id}`)
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
    width: 90%;
    margin: auto;
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
</style>
