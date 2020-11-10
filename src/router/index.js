import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/containers/top'
import About from '@/containers/about'
import Skills from '@/containers/skills'
import Works from '@/containers/works'

<<<<<<< HEAD
=======

>>>>>>> 0b220c351add1db25b56b4275d12847b058ae7cd
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
<<<<<<< HEAD
      components: { about: About, skills: Skills }
=======
      components: { about:About, skills:Skills },
>>>>>>> 0b220c351add1db25b56b4275d12847b058ae7cd
    },
    {
      path: '/works',
      name: 'Works',
      component: Works
    }
  ]
})
