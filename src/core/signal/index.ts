import { MobiuszSignalManager } from "@/libs/signal"
import { M } from "@/shared"
import { AppManager } from "@/core/app/manager"
import { Device, Signal } from "@/libs/signal/"





const MODULE_NAME = 'Signals'




let manager: MobiuszSignalManager




const init = () => {
  // Creates the signal managert to handle and create devices/signals
  manager = new MobiuszSignalManager(AppManager)

  // Listens to Renderer loading WebRTC devices (once)
  AppManager.on(Signal.Event.GUI.PARSE_DEVICES, onGUIDevices)

  // Listens to any object (except Renderer process) asking for devices
  AppManager.on(M.Signal.GET_DEVICES, onAskDevicesObjects)
  // Listens to objects asking for device's info
  AppManager.on(M.Signal.GET_DEVICES_INFO, onAskDevicesInfo)

}

const unref = () => {
  // Just to be sure: AppManager must have removed the listeners at this time.
  AppManager.off(M.Signal.GET_DEVICES, onAskDevicesObjects)
  AppManager.off(M.Signal.GET_DEVICES_INFO, onAskDevicesInfo)
}

/**
 * Called when WebRTC devices have been enumerated by the renderer process.
 * Adds the WebRTC devices to the MobiuszSignalManager and creates handlers.
 * @param {Device.Description} devices A list of WebRTC devices sent by the renderer process.
 * @callback
 */
const onGUIDevices = (devices: Device.Description[]) => {
  // Stops listener.
  AppManager.off(Signal.Event.GUI.PARSE_DEVICES, onGUIDevices)
  // Adds devices to manager that will create appropriate handlers.
  manager.addDevices(devices)
}

/**
 * Gets devices as actual MobiuszDevice objects and sends them back to caller.
 * @param type The type of the device or 'all'
 * @param callback A callback to send back the answer.
 * @callback
 */
 const onAskDevicesObjects = (type: string, callback: any) => {
   // TODO: type
   const devices = manager.getDevices(false)
   callback(devices)
}

/**
 * Gets devices information as JSON objects and sends it back to caller.
 * @param type The type of the device or 'all'
 * @param callback A callback to send back the answer.
 * @callback
 */
const onAskDevicesInfo = (type: string, callback: any) => {
  // TODO: type
  const devices = manager.getDevices(true)
   callback(devices)
}

export default {
  name: MODULE_NAME,
  init,
  unref
}