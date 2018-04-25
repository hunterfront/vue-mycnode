import Vue from 'vue'
import Router from 'vue-router'
import Topics from '@/page/topics'
import About from '@/page/about'
import Content from '@/page/content'
import Login from '@/page/login'
import User from '@/page/user'
import Index from '@/page/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/topics',
      name: 'Topics',
      component: Topics
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/topic/:id',
      name: 'Content',
      component: Content,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/:loginname',
      name: 'User',
      component: User
    }
  ]
})
