// Global AppManager (type could be imported in case we make a package for this)
import { AppManager } from '@/core/app/manager'
// Devices handlers
import { MobiuszAudioHandler } from "../audio";
import { Device } from "./devices/types";
import { MobiuszMIDIHandler } from "../midi";
import { MobiuszOSCHandler } from "../osc";
import { MobiuszSerialHandler } from "../serial";
import { MobiuszVideoHandler } from "../video";

export class MobiuszSignalManager {

  /**
   * The global communication manager with main App (AppManager)
   */
  private _app: typeof AppManager

  private _handlers: {
    audio: MobiuszAudioHandler;
    video: MobiuszVideoHandler;
    osc: MobiuszOSCHandler;
    midi: MobiuszMIDIHandler;
    serial: MobiuszSerialHandler;
  }

  private _order = [
    'audio',
    'video',
    'osc',
    'midi',
    'serial'
  ]

  constructor(app: any) {
    this._app = app
    // Initialize signals handlers
    this._handlers = {
      audio: new MobiuszAudioHandler(this._app),
      video: new MobiuszVideoHandler(this._app),
      osc: new MobiuszOSCHandler(this._app),
      midi: new MobiuszMIDIHandler(this._app),
      serial: new MobiuszSerialHandler(this._app),
    }
    // Listens to all handlers events
    this._addListeners()
  }

  public unref() {

  }

  public addDevice(device: Device.Description) {
    // Gets device signal type and IO type
    const kind = this._getKind(device.kind)
    // Adds the device to the handler (creates MobiuszDevice instance)
    this._handlers[kind.signal].addDevice(kind.type, device)
  }

  public addDevices(devices: Device.Description[]) {
    for (const device of devices) {
      this.addDevice(device)
    }
  }

  public getDevices(json?: boolean) {
    const result = []
    // For each handler
    for (const key of this._order) {
      // For each device in handler
      const description = this._handlers[key].getDevices(json)
      result.push(description)
    }
    return result
  }

  private _getKind(kind: string) {
    // Separates signal type from IO type, on the basis of WebRTC's devices' 'kind' property (eg.: videoinput)
    const index = kind.indexOf('input') >= 0 ? kind.indexOf('input') : (kind.indexOf('output') ? kind.indexOf('output') : kind.indexOf('both'))
    const signal = kind.substr(0, index)
    const type = kind.substr(index)

    return {
      signal,
      type
    }
  }

  private _addListeners() {
    for (const key in this._handlers) {
      this._handlers[key].onAny((event: any, value: any) => {
        // Forwards event
        this._app.emit(event, value)
      })
    }
  }

  private _removeListeners() {
    
  }

}