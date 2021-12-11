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
              <ul>
                <li class="iconfont icon-play" v-for="(item,index) in recommendList" :key="index" @click="toPlaylistDetail(item.id)">
                  <p class="first-p">{{item.copywriter}}</p>
                  <img :src="item.picUrl" alt="rec">
                  <p class="last-p" :title="item.name">{{item.name}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import storage from 'good-storage'
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
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/xNE1UWB8CZzYutl.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/xNE1UWB8CZzYutl.jpg'
        },
        {
          copywriter: '橙子',
          name: '总要吃一个橙子',
          picUrl: 'https://s2.loli.net/2021/12/11/9QtwT82IbAygeGP.jpg'
        }
      ]
    }
  },
  methods: {
    getSongList () {
      let parm = {
        'user_id': storage.get('user_id', 0)
      }
      getsonglistAPI(parm).then(res => {
        console.log('res:::::::' + res.data)
        console.log(res)
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
  .discover {
    max-width: 1300px;
    margin: 0 auto;
    padding: 20px;
  }
  .songs-wrap {
    margin-bottom: 20px;
  }
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
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 12px;
    padding: 5px;
    box-sizing: border-box;
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
    color: #c0392b;
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
  }
  /* 最新音乐  */
  .new-songs {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .new-songs li {
    width: 50%;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
  }
  .new-songs li:hover {
    background-color: #ddd;
  }
  .new-songs li:hover::before {
    opacity: 1;
  }
  .music-img-wrap {
    position: relative;
    width: 100px;
    cursor: pointer;
  }
  .music-img-wrap:hover p::before {
    opacity: 1;
  }
  .music-img-wrap p::before {
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
    color: #c0392b;
    opacity: 0;
    transition: .3s;
    cursor: pointer;
  }
  .music-info {
    flex: 1;
    padding: 0 10px;
  }
  .new-songs li p:first-child {
    margin-bottom: 20px;
  }
  .music-singer {
    color: #a5a1a1;
  }
  /* 推荐MV  */
  .mv-list {
    display: flex;
    justify-content: space-between;
  }
  .mv-list li {
    width: 25%;
    padding: 0 10px;
  }

  .mv-img-wrap {
    position: relative;
    cursor: pointer;
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
    color: #c0392b;
    opacity: 0;
    transition: .3s;
    cursor: pointer;
  }

  .play-count{
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
    text-shadow: 0 0 2px rgb(0, 0, 0);
  }

  .play-count::before {
    margin-right: 5px;
  }

  .mv-info p{
    margin: 5px 0;
  }

  .mv-info .author{
    color: #a5a1a1;
    font-size: 12px;
  }
</style>
