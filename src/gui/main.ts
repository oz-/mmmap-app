/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './main/index.vue'

// Interprocess communication.
import { IpcMessages, SocketMessages } from '../shared'
import { SocketClient } from '../libs/socket'

// Imports default theme.
import '@vuoz/theme-core-default/dist/css/theme.min.css'

// VueRouter and Vuex
import router from './router'
import store from './store'

/**
 * The main entry point for the application's GUI.
 * @module GUI
 */

// Vue.js config
Vue.config.productionTip = false

Vue.use(VueMeta)

/**
 * SocketClient object to handle communication with the main process.
 * @memberof module:GUI
 */
let socket: SocketClient | null

/**
 * Electron's IpcRenderer methods exposed by the 'preload.js' file.
 * @memberof module:GUI
 */
const main = (window as { [key: string]: any })['app']

// Ask for the main process' WebSocket port
main.ipc.invoke(IpcMessages.GET_SOCKET_PORT)
  .then((port: number) => {

    // Creates a SocketClient object to handle IPC in place of Electron's IPC module
    socket = new SocketClient(port, SocketMessages)

    // Lets client use the WebSocket client from her components
    Vue.prototype.$app = {
      on: socket.on.bind(socket),
      off: socket.off.bind(socket),
      send: socket.send.bind(socket)
    }

    // Creates app
    new Vue({
      router,
      store,
      render: h => h(App),
      created() {
        onConnect = onConnect.bind(this)
        Vue.prototype.$app.on(SocketMessages.CONNECTED, onConnect)
      },
      beforeDestroy() {

        Vue.prototype.$app.off(SocketMessages.CONNECTED, onConnect)
        // Tears down the app
        Vue.prototype.$app = null
        socket!.unref()
        socket = null

      }
    }).$mount('#app')

  }).catch((err: Error) => {
    console.error(err)
  })

let onConnect = () => {

  // Gets theme from main process.
  console.warn('TODO: get theme used by the client in the application.')
  setThemePath = setThemePath.bind(Vue)
  Vue.prototype.$app.send(SocketMessages.GET_THEMES, null, setThemePath)
}

/**
 * Callback executed with the answer of the main process to the GET_THEME message.
 * @param payload { object } The objet returned by the call to main process.
 * @callback
 * @memberof module:GUI
 */
let setThemePath = async (event: any) => {

  // TODO: keep in Vuex Store
  Vue.prototype.$app.off(setThemePath)
  // TODO
  // const theme = event.payload.find((t: any) => t.id === 'core.default')
  // const htmlElement = document.documentElement
  // htmlElement.setAttribute('theme', theme.id)

}