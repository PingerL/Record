import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import storage from './assets/lib/storage'

Vue.config.productionTip = false
Vue.prototype.$storage = storage

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
