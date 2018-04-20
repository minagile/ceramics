import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import HelloWorld from '@/components/HelloWorld'
import PersonalCenter from '@/components/PersonalCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    {
      path: '/he',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
