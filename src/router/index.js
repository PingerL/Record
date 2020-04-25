import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Handle from '../components/Handle.vue'
Vue.use(VueRouter)

  const routes = [
  {path:'/',name:"home", component:Home},
  {path:'/handle',component:Handle},
  {path:'*',redirect:'/'}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
