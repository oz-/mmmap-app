import { Signal } from '@/libs/signal/shared'
import { IpcSocket } from '@/libs/ipcsocket/types'

import Vue from 'vue'
import { Store } from "vuex"
import adapter from 'webrtc-adapter'




export const initDevicesPlugin = (store: Store<any>) => {

  const ipc = Vue.prototype.$app
  // Gets devices from renderer process when connected
  ipc.on(IpcSocket.Client.Event.CONNECTED, () => {
    enumerateDevices()
    .then(devices => {
      ipc.send(Signal.Event.GUI.PARSE_DEVICES, devices)
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