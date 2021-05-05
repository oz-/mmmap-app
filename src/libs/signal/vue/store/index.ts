import OSCStore from '../../osc/store'





export const SignalStore = {
  name: 'signal',
  namespaced: true,
  state: {
    ...OSCStore.state,
    signals: true
  },
  actions: {
    ...OSCStore.actions
  }
}

export { initDevicesPlugin } from './plugins/store.devices'