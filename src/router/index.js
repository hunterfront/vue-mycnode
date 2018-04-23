import Vue from 'vue'
import Router from 'vue-router'
import Topics from '@/page/topics'
import About from '@/page/about'
import Content from '@/page/content'

Vue.use(Router)

export default new Router({
  routes: [
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
    }
  ]
})
