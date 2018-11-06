import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Cinema from '@/components/cinema/Cinema'
import Me from '@/components/me/Me'
import NoData from '@/components/NoData'
import store from '@/store'
import CinemaDetail from '@/components/cinemaDetail/CinemaDetail'
Vue.use(Router)
Vue.use(store)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cinema',
    name: 'Cinema',
    component: Cinema
  },
  {
    path: '/cinema/detail/:id',
    name: 'cinemaDetail',
    component: CinemaDetail
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/no',
    name: 'NoData',
    component: NoData
  }
];

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  store._mutations.pushLoadStack[0]()
  next()
})

router.afterEach(route => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  window.onscroll = null
  setTimeout(() => {
    store._mutations.completeLoad[0]()
  }, 200)
})

export default router
