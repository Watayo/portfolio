import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/containers/top'
import About from '@/containers/about'
import Skills from '@/containers/skills'
import Works from '@/containers/works'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/main',
      name: 'Main',
      components: { about: About, skills: Skills }
    },
    {
      path: '/works',
      name: 'Works',
      component: Works
    }
  ]
})
