import { v4 as uuidv4 } from 'uuid'

import { MobiuszDeviceHandler } from "@/libs/signal/devices";
import { Device } from "../../devices/types";

import { AppManager } from '@/core/app/manager'

import { MobiuszOSCDevice } from "../device";
import { OSC } from '../messages'
import { config } from '../components/config'

import getPort from 'get-port'



export class MobiuszOSCHandler extends MobiuszDeviceHandler {

  static category = Device.Category.DATA

  constructor(app: typeof AppManager) {
    super(app)

    this._addListeners()
  }

  public unref() {
    this._removeListeners()
  }

  public addDevice(type: Device.Type, description: Device.Description) {

    this._devices.push(new MobiuszOSCDevice(this, type, description))

  }

  public getDevices(json?: boolean) {

    return super.getDevices(config, json)

  }

  private _addListeners() {

    this._onInputOpen = this._onInputOpen.bind(this)
    this._onClose = this._onClose.bind(this)
    this._onOutputOpen = this._onOutputOpen.bind(this)
    this._onEmitMessage = this._onEmitMessage.bind(this)
    // TODO: check if input already exists
    this.app.on(OSC.Event.INPUT_OPEN, this._onInputOpen)
    this.app.on(OSC.Event.OUTPUT_OPEN, this._onOutputOpen)
    this.app.on(OSC.Event.EMIT, this._onEmitMessage)
    this.app.on(OSC.Event.CLOSE, this._onClose)

  }

  private _removeListeners() {

    this.app.off(OSC.Event.INPUT_OPEN, this._onInputOpen)
    this.app.off(OSC.Event.OUTPUT_OPEN, this._onOutputOpen)
    this.app.off(OSC.Event.EMIT, this._onEmitMessage)
    this.app.off(OSC.Event.CLOSE, this._onClose)

  }

  private _onInputOpen(description: {
    label: string,
    options: { host: string; port: number; }
  }, callback: any) {

    const definition = {
      deviceId: uuidv4(),
      label: description.label,
      kind: 'oscinput',
      options: description.options
    }

    this.addDevice('input', definition)
    callback(definition)
  }

  private _onClose(id: string, callback: Function) {

    const device = this._devices.find((d: any) => d._id === id)
    if (device) {
      const description = device.toJSON()
      // FIXME: we unref and do not close, as it's impossible to test if the device is running to open or close it
      device.unref()
      // Remove it from our devices array
      const index = this._devices.indexOf(device)
      this._devices.splice(index, 1)
      // Informs the caller.
      callback(description)
    }

  }

  private _onOutputOpen(description: {
    label: string,
    options: { host: string; port: number; }
  }, callback: any) {

    // Gets available local port
    getPort()
    .then(localPort => {

      const definition = {
        deviceId: uuidv4(),
        label: description.label,
        kind: 'oscoutput',
        options: {
          ...description.options,
          local: localPort
        }
      }
  
      this.addDevice('output', definition)
      callback(definition)
    }).catch(err => {
      console.error(err)
    })

  }

  private _onEmitMessage(definition: any) {
    const device = this._devices.find((d: any) => d._id === definition.device)
    if (device) {
      (device as MobiuszOSCDevice).emitMessage(definition.message)
    }
  }

}