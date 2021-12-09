import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/login/login')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/home/index'),
      children: [
        {
          path: '/index/first',
          name: 'first',
          component: () => import('@/views/home/first')
        },
        {
          path: '/index/songlist',
          name: 'songlist',
          component: () => import('@/views/home/songlist')
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
