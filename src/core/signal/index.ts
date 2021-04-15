import { MobiuszDevice, MobiuszVideoDevice, MobiuszAudioDevice, MobiuszOSCDevice, MobiuszMIDIDevice, MobiuszSerialDevice } from "@/libs/signal"
import { SocketMessages } from "@/shared"
import { AppManager } from "../manager"





const MODULE_NAME = 'Signals'




let DEVICES: MobiuszDevice[] = []

const init = () => {
  // Listens to Renderer loading WebRTC devices
  AppManager.on(SocketMessages.GOT_RTC_DEVICES, onGotDevices)
  // Listens to any object (except Renderer process) asking for devices
  AppManager.on(SocketMessages.GET_DEVICES, onAskDevices)
  // Listens to objects asking for device's info
  AppManager.on(SocketMessages.GET_DEVICES_INFO, onAskDevicesInfo)
}

const unref = () => {

  for (const device of DEVICES) {
    device.unref()
  }
  DEVICES = []

}

const onGotDevices = (devices: any) => {
  AppManager.off(SocketMessages.GOT_RTC_DEVICES, onGotDevices)
  // Creates MobiuszDevice instances with devices found by WebRTC
  for (const device of devices) {
    switch (device.kind) {
      case 'videoinput': {
        DEVICES.push(new MobiuszVideoDevice(device))
        break
      }
      case 'audioinput': {
        DEVICES.push(new MobiuszAudioDevice('input', device))
        break
      }
      case 'audiooutput': {
        DEVICES.push(new MobiuszAudioDevice('output', device))
        break
      }
    }
  }
  // TODO
  // Creates MobisuzOSCDevice instance for inputs and outputs
  DEVICES.push(new MobiuszOSCDevice('input', {
    deviceId: 'Fake Client',
    label: 'OSC Client (Fake)',
    kind: 'oscinput',
    groupId: ''
  })) 
  DEVICES.push(new MobiuszOSCDevice('output', {
    deviceId: 'Fake Server',
    label: 'OSC Server (Fake)',
    kind: 'oscoutput',
    groupId: ''
  })) 
  // TODO
  // Creates MobisuzMIDIDevice instance for inputs and outputs
  DEVICES.push(new MobiuszMIDIDevice('input', {
    deviceId: 'Fake Client',
    label: 'MIDI Client (Fake)',
    kind: 'midiinput',
    groupId: ''
  })) 
  DEVICES.push(new MobiuszMIDIDevice('output', {
    deviceId: 'Fake Server',
    label: 'MIDI Server (Fake)',
    kind: 'midioutput',
    groupId: ''
  })) 
  // TODO
  // Creates MobisuzSerialDevice instance for inputs and outputs
  DEVICES.push(new MobiuszSerialDevice('input', {
    deviceId: 'Fake Client',
    label: 'Serial Client (Fake)',
    kind: 'serialinput',
    groupId: ''
  })) 
  DEVICES.push(new MobiuszSerialDevice('output', {
    deviceId: 'Fake Server',
    label: 'Serial Server (Fake)',
    kind: 'serialoutput',
    groupId: ''
  })) 
}

/**
 * Gets all devices information as actual MobiuszDevice objects.
 * @param type The type of the device or 'all'
 * @param callback A callback to send back the answer.
 */
 const onAskDevices = (type: string, callback: any) => {
  switch (type) {
    case 'all': {
      const devices = {}
      for (const device of DEVICES) {
        const signal = device.constructor['signal']
        if (!devices[signal]) {
          // No entry for this type of signal, let's create it.
          devices[device.constructor['signal']] = {}
        }
        if (!devices[signal][device.type]) {
          // No entry for this type (input or output) in the signal entry.
          devices[signal][device.type] = []
          Object.defineProperty(devices[signal], device.type, { value: [] })
        }
        devices[signal][device.type].push(device)
      }

      callback(devices)
      break
    }
  }
}


/**
 * Gets all devices information as JSON objects.
 * @param type The type of the device or 'all'
 * @param callback A callback to send back the answer.
 */
const onAskDevicesInfo = (type: string, callback: any) => {
  switch (type) {
    case 'all': {
      const devices = {}
      for (const device of DEVICES) {
        const signal = device.constructor['signal']
        if (!devices[signal]) {
          // No entry for this type of signal, let's create it.
          devices[device.constructor['signal']] = {}
        }
        if (!devices[signal][device.type]) {
          // No entry for this type (input or output) in the signal entry.
          devices[signal][device.type] = []
          Object.defineProperty(devices[signal], device.type, { value: [] })
        }
        devices[signal][device.type].push(device.toJSON())
      }

      callback(devices)
      break
    }
  }
}

export default {
  name: MODULE_NAME,
  init,
  unref
}