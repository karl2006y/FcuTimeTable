import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'TimeTable',
      component: () => import('./pages/PageTimeTable')
    },
 
  ]
})
