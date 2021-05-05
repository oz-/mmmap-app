import { EventEmitter2 } from "eventemitter2";

import { AppManager } from '@/core/app/manager'

import { MobiuszDevice } from "../device";
import { Device } from "../types";





export class MobiuszDeviceHandler extends EventEmitter2 {

  /**
   * The global communication manager with main App (AppManager)
   */
  private _app: typeof AppManager

  static category: string

  protected _devices: MobiuszDevice[] = []


  constructor(app: typeof AppManager) {
    // Initializes EventEmitter2 with ':' delimiter for events.
    // That means that we can listen to 'osc:*' for example.
    super({ wildcard: true, delimiter: ':' })
    // Keep app communication
    this._app = app
  }

  public unref() {

  }

  public addDevice(type: Device.Type, description: Device.Description) {
    // To be called by subclasses
  }

  protected getDevices(config: any, json?: boolean) {
    const devices = {}
    // For each device
    for (const device of this._devices) {
      if (!devices[device.type]) {
        devices[device.type] = []
      }
      if (json) {
        // Sends only the description of the device.
        devices[device.type].push(device.toJSON())
      } else {
        // Sends the instance of the device's class
        devices[device.type].push(device)
      }
    }
    // Get this signal handler category and UI configuration
    const result = {
      category: this.constructor['category'],
      gui: config,
      devices
    }
    return result
  }

  protected get app() {
    return this._app
  }

}