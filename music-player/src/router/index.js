import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/login')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/home/index'),
      children: [
        {
          path: '/index',
          name: 'first',
          component: () => import('@/views/home/first')
        },
        {
          path: '/index/songlist',
          name: 'songlist',
          component: () => import('@/views/home/songlist')
        },
        {
          path: '/index/playlistdetail',
          name: 'playlistdetail',
          component: () => import('@/views/home/playlistdetail')
        },
        {
          path: '/index/dailyplaylist',
          name: 'dailyplaylist',
          component: () => import('@/views/home/dailyplaylist')
        },
        {
          path: '/index/singer',
          name: 'singer',
          component: () => import('@/views/home/singer')
        },
        {
          path: '/index/singerDetail',
          name: 'singerDetail',
          component: () => import('@/views/singer/singerDetail')
        },
        {
          path: '/index/mymusic',
          name: 'mymusic',
          component: () => import('@/views/home/mymusic')
        },
        {
          path: '/index/userinfo',
          name: 'userinfo',
          component: () => import('@/views/userInfo/index')
        },
        {
          path: '/index/albumdetail',
          name: 'albumdetail',
          component: () => import('@/views/home/albumdetail')
        },
        {
          path: '/index/search',
          name: 'search',
          component: () => import('@/views/home/search')
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/register')
    },
    {
      path: '/forgetpassword',
      name: 'ForgetPassword',
      component: () => import('@/views/register/forgetpassword')
    },
    {
      path: '/playMusic',
      name: 'PlayMusic',
      component: () => import('@/views/song/playMusic')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/adminfram'),
      children: [
        {
          path: '/admin/first',
          name: 'first',
          component: () => import('@/views/admin/first')
        },
        {
          path: '/admin/usermangement',
          name: 'usermangement',
          component: () => import('@/views/admin/usermangement')
        },
        {
          path: '/admin/singermangement',
          name: 'singermangement',
          component: () => import('@/views/admin/singermangement')
        },
        {
          path: '/admin/songmangement',
          name: 'songmangement',
          component: () => import('@/views/admin/songmangement')
        },
        {
          path: '/admin/albummangement',
          name: 'alnummangement',
          component: () => import('@/views/admin/albummangement')
        },
        {
          path: '/admin/albumsongs',
          name: 'alnumsongst',
          component: () => import('@/views/admin/albumsongs')
        },
        {
          path: '/admin/playlistsongs',
          name: 'playlistsongst',
          component: () => import('@/views/admin/playlistsongs')
        }
      ]
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/views/test/test')
    }
  ]
})
