import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $app: {
      on(channel: string, listener: ((...args: any[]) => any)): void,
      off(channel: string, listener: ((...args: any[]) => any)): void,
      send(channel: string, payload?: any | undefined, callback?: ((...args: any[]) => any) | undefined): void
    }
  }
}