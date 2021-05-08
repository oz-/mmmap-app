import { Signal } from '@/libs/signal/shared'
import { IpcSocket } from '@/libs/ipcsocket/types'

import Vue from 'vue'
import { Store } from "vuex"
import adapter from 'webrtc-adapter'




export const initDevicesPlugin = (store: Store<any>) => {

  const app = Vue.prototype.$app
  // Gets media devices from renderer process when connected
  app.on(IpcSocket.Client.Event.CONNECTED, () => {
    enumerateDevices()
    .then(devices => {
      // Asks main process toregister the devices
      app.send(Signal.Event.Devices.REGISTER, devices)
    }).catch(err => {
      console.error(err)
    })
  })

}

const enumerateDevices = async () => {
  // Enumerate all media devices
  const devices = await navigator.mediaDevices.enumerateDevices()
  return devices
}