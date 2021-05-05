import { state } from './state'
import { mutations } from './mutations'




export const ApplicationStore = {
  name: 'application',
  namespaced: true,
  state,
  mutations
}

export { initIpcPlugin } from './plugins/store.ipc'
export { initSharedStorePlugin } from './plugins/store.shared'
export { initServerPlugin } from './plugins/store.server'
export { initTabsPlugin } from './plugins/store.tabs'