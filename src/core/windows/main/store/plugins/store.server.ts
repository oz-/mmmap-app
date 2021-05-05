import { ApplicationMutationTypes } from '../mutations'
import Vue from 'vue'
import { Store } from "vuex"
import { M } from '@/shared'




// TODO: Automatic recordiing in Electron persistent store
// se store.subscribe at https://next.vuex.vuejs.org/guide/plugins.html
export const initServerPlugin = (store: Store<any>) => {

  const app = Vue.prototype.$app
  // Listen to connected / disconnected events
  app.on(M.Server.Socket.CONNECTED, () => {
    console.log('CONNECTED')
    // Change server 'connected' state.
    store.commit(`application/${ApplicationMutationTypes.SERVER_CONNECTION}`, true)
    store.commit(`application/${ApplicationMutationTypes.SERVER_RECONNECTION}`, false)
  })
  app.on(M.Server.Socket.DISCONNECTED, () => {
    // Change application 'connected' state.
    store.commit(`application/${ApplicationMutationTypes.SERVER_CONNECTION}`, false)
  })
  app.on(M.Server.Socket.RECONNECTING, () => {
    // Change application 'connected' state.
    store.commit(`application/${ApplicationMutationTypes.SERVER_RECONNECTION}`, true)
  })

}