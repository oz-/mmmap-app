import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

// Windows routes
import Splash from '@/core/windows/splash/content/main/route'
import Main from '@/core/windows/main/content/main/route'
import Settings from '@/core/windows/settings/content/main/route'
import Signals from '@/core/windows/signals/content/main/route'

const routes: Array<RouteConfig> = [
  Splash,
  Main,
  Settings,
  Signals
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router