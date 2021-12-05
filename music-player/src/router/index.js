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
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/register')
    }
  ]
})
