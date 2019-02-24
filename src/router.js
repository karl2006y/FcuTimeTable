import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => import('./pages/Homepage'),
      children: [
        {
          path: '/login',
          name: 'login',

          component: () => import('./pages/PLogin')
        },
        {
          path: '/timetable',
          name: 'timetable',
          component: () => import('./pages/PageTimeTable')
        },
        {
          path: '/chooseday',
          name: 'chooseday',
          component: () => import('./pages/PChooseDay')
        }
      ]
    },
    {
      path: '/ics',
      name: 'IcsComponents',
      component: () => import('./components/IcsComponents')
    }
  ]
})
