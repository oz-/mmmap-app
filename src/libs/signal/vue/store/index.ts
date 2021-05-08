import AudioStore from '../../audio/store'
import VideoStore from '../../video/store'
import OSCStore from '../../osc/store'





export const SignalStore = {
  name: 'signal',
  namespaced: true,
  state: {
    ...AudioStore.state,
    ...VideoStore.state,
    ...OSCStore.state,
  },
  actions: {
    ...AudioStore.actions,
    ...VideoStore.actions,
    ...OSCStore.actions
  }
}

export { initDevicesPlugin } from './plugins/store.devices'