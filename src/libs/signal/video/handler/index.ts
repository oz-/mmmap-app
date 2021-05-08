import { MobiuszDevice, MobiuszDeviceHandler } from "@/libs/signal/main/devices";
import { Device } from "../../main/devices/types";

import { AppManager } from '@/core/app/manager'

import { MobiuszVideoDevice } from "../device";
import { config } from '../components/config'
import { Video } from "../messages";





export class MobiuszVideoHandler extends MobiuszDeviceHandler {

  static category = Device.Category.AV

  constructor(app: typeof AppManager) {
    super(app)

    this._addListeners()
  }

  public unref() {
    this._removeListeners()
  }

  private _addListeners() {

    this._onInputOpen = this._onInputOpen.bind(this)
    this._onInputClose = this._onInputClose.bind(this)
    this.app.on(Video.Event.INPUT_OPEN, this._onInputOpen)
    this.app.on(Video.Event.INPUT_CLOSE, this._onInputClose)

  }

  private _removeListeners() {

    this.app.off(Video.Event.INPUT_OPEN, this._onInputOpen)
    this.app.off(Video.Event.INPUT_CLOSE, this._onInputClose)

  }

  public addDevice(type: Device.Type, description: Device.Description) {

    this._devices.push(new MobiuszVideoDevice(this, type, description))

  }

  public getDevices(json?: boolean) {

    return super.getDevices(config, json)

  }

  private _onInputOpen(description: {
    id: string,
    options: any
  }, callback: any) {
    const device = this._devices.find((d: MobiuszDevice) => d.id === description.id)
    if (device) {
      (device as MobiuszVideoDevice).open()
      callback({
        type: 'success',
        device
      })
    } else {
      callback({
        type: 'error',
        message: 'Device was not found.'
      })
    }
  }

  private _onInputClose(id: string, callback: any) {
    const device = this._devices.find((d: MobiuszDevice) => d.id === id)
    if (device) {
      (device as MobiuszVideoDevice).close()
      callback({
        type: 'success',
        device
      })
    } else {
      callback({
        type: 'error',
        message: 'Device was not found.'
      })
    }
  }

}