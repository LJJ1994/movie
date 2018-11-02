import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home/Home'
import Cinema from '@/components/cinema/Cinema'
import Me from '@/components/me/Me'
import store from '@/store'

Vue.use(Router)
Vue.use(store)

const routes = [
    {
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
    	path: '/me',
    	name: 'Me',
    	component: Me
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
