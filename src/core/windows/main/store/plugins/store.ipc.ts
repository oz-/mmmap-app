import { IpcSocket } from '@/libs/ipcsocket/types'
import { ApplicationMutationTypes } from '../mutations'
import Vue from 'vue'
import { Store } from "vuex"




// TODO: Automatic recording in Electron persistent store
// se store.subscribe at https://next.vuex.vuejs.org/guide/plugins.html
export const initIpcPlugin = (store: Store<any>) => {

  const ipc = Vue.prototype.$app
  // Listen to connected / disconnected events
  ipc.on(IpcSocket.Client.Event.CONNECTED, () => {
    // Change application 'connected' state.
    store.commit(`application/${ApplicationMutationTypes.IPC_CONNECTION}`, true)
  })
  ipc.on(IpcSocket.Client.Event.DISCONNECTED, () => {
    console.warn('DISCONNECTED')
    // Change application 'connected' state.
    store.commit(`application/${ApplicationMutationTypes.IPC_CONNECTION}`, false)
  })

}