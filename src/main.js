import Vue from 'vue' 
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
// import 'bootstrap/dist/js/bootstrap'
import 'bootstrap';

// import plugins individually - require exports-loader
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/tooltip'

// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/scss/bootstrap.scss'

// jquery
import $ from 'jquery';

global.$ = $

//lottie
import lottie from 'vue-lottie';
Vue.component('lottie', lottie)


import LoadingCardComponents from '@/components/LoadingCardComponents';
Vue.component('LoadingCardComponents', LoadingCardComponents)



import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
