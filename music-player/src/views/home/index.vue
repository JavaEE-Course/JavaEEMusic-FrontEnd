<template>
  <div>
    <div class="Img_Box">
      <img src="../../assets/1.jpg" width="100%" height="100%" />
    </div>
    <div class="Img_Box">
    <el-card class="Card" style="border-radius: 12px"></el-card>
    </div>
    <div class="nav">
      <ul class="nav-centent">
        <li class="icon iconfont icon-yinleguangpan" style="color: silver;margin-top: -8px"></li>
        <li class="words">MusicPlayer</li>
        <li v-for="(item , index) in items" @click="click (item)" v-bind:key="index">
          <a :href="item.href" :class="item.id">{{item.name}}</a>
        </li>
        <li>
          <el-input type="text" placeholder="搜索音乐"  v-model="keywords" class="input"></el-input>
        </li>
        <li>
          <el-button class="button" type="primary" style="padding-left: 9px" @click="search">搜索</el-button>
        </li>
        <li>
          <el-avatar class="head" :src="avatar"></el-avatar>
        </li>
        <li>
          <el-dropdown class="drop" trigger="click" @command="handleCommand" style="color: white">
                    <span class="el-dropdown-link" trigger="click">
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="accountInfo">账号信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
<!--    <Bottom></Bottom>-->
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
import { getuserinfoAPI } from '@/api/getuserinfo'
// import Bottom from '../../components/Bottom.vue'
export default{
  // components: {Bottom},
  data () {
    return {
      avatar: '',
      nowIndex: 0,
      keywords: '',
      items: [
        {
          name: '首页'
        },
        {
          name: '歌单'
        },
        {
          name: '歌手'
        },
        {
          name: '我的音乐'
        }
      ]
    }
  },
  created () {
    if (window.sessionStorage.getItem('userID') === null) {
      this.$router.push({ path: '/login' })
    }
    let parm = {
      'id': window.sessionStorage.getItem('userID')
    }
    getuserinfoAPI(parm).then(res => {
      console.log('nikan')
      this.avatar = res.data.data.avatarPath
    })
  },
  methods: {
    click (item) {
      console.log(item.name)
      if (item.name === '首页') {
        this.$router.push({path: '/index'})
      }
      if (item.name === '歌单') {
        this.$router.push({path: '/index/songlist'})
      }
      if (item.name === '歌手') {
        this.$router.push({path: '/index/singer'})
      }
      if (item.name === '我的音乐') {
        this.$router.push({path: '/index/mymusic'})
      }
    },
    handleCommand (command) {
      if (command === 'accountInfo') {
        this.$router.push({ path: '/index/userinfo' })
      }
      if (command === 'logout') {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    },
    search () {
      this.$router.push({path: '/index/search', query: {info: this.keywords}})
    }
  }
}

</script>
<style type="text/css" scoped>
  .Img_Box {
    height: fit-content;
    position: fixed;
    top: 0;
    left: 0;
    width: 102%;
    z-index: -1;
  }
  .nav{width:103.5%;height: 50px;background: #2e0f6d; margin-top: -60px;margin-left: -8px;margin-right: -8px;position: fixed;z-index: 1000;}
  .nav .nav-centent{width: 1200px;margin:0 auto;height: 50px;}
  .nav .nav-centent > li{width: 100px;height: 50px;display: block;float: left;}
  .nav .nav-centent li a{width: 100px;height: 50px;display: block;font-size: 18px;line-height: 50px;color: #fff;}
  .nav .nav-centent ul{position: absolute;left: 0;top: 50px;z-index: 99;width: 100%;}
  .nav .nav-centent ul li{width: 120px;height: 50px;display: block;float: left;text-align: center;margin-right: 20px;line-height: 50px;background:  #2e0f6d;}
  .nav .nav-centent ul li a:hover{background: #fff;color: #2e0f6d; }
  .nav .nav-centent li a:hover{background: #fff;color: #2e0f6d; }
  .nav .nav-centent li a.on{background: #fff;color: #2e0f6d; }
  .input{margin: auto;height: 35px; width: 218px;margin-top: 4px;margin-left: 180px}
  .button{width: 50%;margin-top: 4px;margin-left: 300px}
  .head{margin-top: 5px;margin-left: 310px;}
  .drop{margin-top: 32px;margin-left: 245px}
  .words{text-shadow: 0 0 5px white,0 0 10px #68a5d4,0 0 15px #8ef1ef,0 0 20px #ffffff;font-size: 25px;font-weight: bold;color: white;margin-top: 15px;padding-right: 80px}
</style>
