import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import 'bootstrap/dist/js/bootstrap'
import 'bootstrap';

// import plugins individually - require exports-loader
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/tooltip'

// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/scss/bootstrap.scss'

// jquery
global.$ = $

//lottie
import lottie from 'vue-lottie';
Vue.component('lottie', lottie)





import App from './App.vue'
import router from './router'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
