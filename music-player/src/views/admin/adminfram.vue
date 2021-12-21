<template>
  <div>
    <el-container>
    <div class="nav">
      <ul class="nav-centent">
        <li class="icon iconfont icon-yinleguangpan" style="color: #723131;margin-top: -8px"></li>
        <li class="words">MusicPlayer</li>
        <li style="margin-left: 600px">
          <el-avatar class="head" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </li>
        <li>
          <el-dropdown class="drop" trigger="click" @command="handleCommand" style="color: white">
                    <span class="el-dropdown-link" trigger="click">
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <div>
      <el-card style="width: 0;height: 0"></el-card>
    </div>
    <div style="width: 150px;margin-left: -8px;margin-top: -12px;position: fixed">
      <el-menu router :default-active="$route.path"
               style="height: 750px;"
        class="el-menu-vertical-demo"
        background-color="#ccccca"
        text-color="#fff"
        active-text-color="#723131">
        <el-menu-item index="/admin/first">
          <i class="el-icon-menu"></i>
          <span slot="title">系统首页</span>
        </el-menu-item>
        <el-menu-item index="/admin/usermangement">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/singermangement">
          <i class="el-icon-s-custom"></i>
          <span slot="title">歌手管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/songmangement">
          <i class="el-icon-headset"></i>
          <span slot="title">歌单管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/albummangement">
          <i class="el-icon-film"></i>
          <span slot="title">专辑管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    </el-container>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script type="text/javascript">
export default{
  data () {
    return {
      nowIndex: 0
    }
  },
  created () {
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
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
  .nav{width:103.5%;height: 60px;background: #ccccca; margin-top: -60px;margin-left: -8px;margin-right: -8px;position: fixed;z-index: 1000;}
  .nav .nav-centent{width: 1200px;margin:0 auto;height: 50px;}
  .nav .nav-centent > li{width: 100px;height: 50px;display: block;float: left;}
  .nav .nav-centent li a{width: 100px;height: 50px;display: block;font-size: 18px;line-height: 50px;color: #fff;}
  .nav .nav-centent ul{position: absolute;left: 0;top: 50px;z-index: 99;width: 100%;}
  .nav .nav-centent ul li{width: 120px;height: 50px;display: block;float: left;text-align: center;margin-right: 20px;line-height: 50px;background: #d1d2d4;}
  .nav .nav-centent ul li a:hover{background: #fff;color: #d0d1d3; }
  .nav .nav-centent li a:hover{background: #fff;color: #cdd1d2; }
  .nav .nav-centent li a.on{background: #fff;color: #d0d1d3; }
  .head{margin-top: 5px;margin-left: 310px;}
  .drop{margin-top: 32px;margin-left: 245px}
  .words{text-shadow: 0 0 5px white,0 0 10px #d47868,0 0 15px #d56213,0 0 20px #ffffff;font-size: 25px;font-weight: bold;color: white;margin-top: 15px;padding-right: 80px}
</style>
