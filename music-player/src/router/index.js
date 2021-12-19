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
          path: '/index/singer',
          name: 'singer',
          component: () => import('@/views/home/singer')
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
      path: '/test',
      name: 'Test',
      component: () => import('../views/test/test')
    }
  ]
})
