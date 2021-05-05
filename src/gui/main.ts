/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './main/index.vue'

// Interprocess communication.
import { M } from '../shared'
import { IpcSocket, IpcSocketClient } from '../libs/ipcsocket'

// Imports default theme.
import '@vuoz/theme-core-default/dist/css/theme.min.css'

// VueRouter and Vuex
import router from './router'
import store from './store'

/**
 * Configure store.
 */
// TODO: 'plugin' based
// see: https://forum.vuejs.org/t/creating-re-usable-vuex-store-with-store-registermodule/33754
import { ApplicationStore, initIpcPlugin, initSharedStorePlugin, initServerPlugin, initTabsPlugin } from '@/core/windows/main/store'
import { SignalStore, initDevicesPlugin } from '@/libs/signal/vue'

/**
 * The main entry point for the application's GUI.
 * @module GUI
 */

// Vue.js config
Vue.config.productionTip = false

Vue.use(VueMeta)

/**
 * IpcSocketClient object to handle communication with the main process.
 * @memberof module:GUI
 */
let socket: IpcSocketClient | null

/**
 * Electron's IpcRenderer methods exposed by the 'preload.js' file.
 * @memberof module:GUI
 */
const main = (window as { [key: string]: any })['app']

// Ask for the main process' WebIpcSocket port
main.ipc.invoke(M.Ipc.GET_IPC_PORT)
  .then((port: number) => {

    // Creates a IpcSocketClient object to handle IPC in place of Electron's IPC module
    socket = new IpcSocketClient(port)
    // Lets client use the WebIpcSocket client from her components
    Vue.prototype.$app = {
      on: socket.on.bind(socket),
      off: socket.off.bind(socket),
      send: socket.send.bind(socket)
    }

    // TODO: see https://jsgv.io/blog/sharing-vuex-state-across-electron-browser-windows/
    // for sharing store between windows.

    // Register store modules
    store.registerModule(ApplicationStore.name, ApplicationStore)
    store.registerModule(SignalStore.name, SignalStore)
    // Initialize store plugins
    initIpcPlugin(store)
    initSharedStorePlugin(store)
    initServerPlugin(store)
    initTabsPlugin(store)
    initDevicesPlugin(store)

    // Wait for connection to create app
    Vue.prototype.$app.on(IpcSocket.Client.Event.CONNECTED, () => {
      // Creates app
      new Vue({
        router,
        store,
        render: h => h(App),
        beforeDestroy() {

          // Tears down the app
          Vue.prototype.$app = null
          socket!.unref()
          socket = null

        }
      }).$mount('#app')
    })

  }).catch((err: Error) => {
    console.error(err)
  })