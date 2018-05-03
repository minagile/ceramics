import Vue from 'vue'
import Router from 'vue-router'
// import HomePage from '@/components/HomePage'
import HelloWorld from '@/components/HelloWorld'
import PersonalCenter from '@/components/PersonalCenter'
import AboutUS from '@/components/AboutUS'
import ServerTerms from '@/components/ServerTerms'
import TwoLevelPage from '@/components/TwoLevelPage'
import UserTwo from '@/components/UserTwo'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [
    {
      path: '/',
      name: 'HomePage',
      // component: HomePage,
      meta: {
        keepAlive: true,
        isBack: false
      },
      component: (resolve) => require(['@/components/HomePage'], resolve)
    },
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter,
      meta: {
        keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/usertwo',
      name: 'UserTwo',
      component: UserTwo,
      meta: {
        keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/he',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/aboutus',
      name: 'AboutUS',
      component: AboutUS,
      meta: {
        keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/serverterms',
      name: 'ServerTerms',
      component: ServerTerms,
      meta: {
        keepAlive: false,
        isBack: false
      }
    },
    {
      path: '/twolevelpage',
      name: 'TwoLevelPage',
      component: TwoLevelPage,
      meta: {
        keepAlive: false,
        isBack: false
      }
    }
  ]
})
