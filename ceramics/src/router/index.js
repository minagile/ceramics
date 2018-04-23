import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import HelloWorld from '@/components/HelloWorld'
import PersonalCenter from '@/components/PersonalCenter'
import AboutUS from '@/components/AboutUS'
import ServerTerms from '@/components/ServerTerms'

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
    },
    {
      path: '/aboutus',
      name: 'AboutUS',
      component: AboutUS
    },
    {
      path: '/serverterms',
      name: 'ServerTerms',
      component: ServerTerms
    }
  ]
})
