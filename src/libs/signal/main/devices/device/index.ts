import EventEmitter from "events";
import { MobiuszDeviceHandler } from "../handler";

import { Device } from "../types"





export class MobiuszDevice extends EventEmitter {

  static signal: string

  protected _handler: MobiuszDeviceHandler

  protected _type: string
  protected _id: string
  protected _label: string
  protected _fullLabel: string
  protected _options: any

  constructor(handler: MobiuszDeviceHandler, type: Device.Type, description: Device.Description) {

    super()

    this._handler = handler

    this._type = type
    this._id = description.deviceId
    this._label = description.label.replace(/ *\([^)]*\) */g, '').trim()
    this._fullLabel = description.label
    this._options = description.options

  }

  public unref() {
    //
  }

  /**
   * Transforms the object in a JSON obejct that can be passed through WebIpcSockets
   * @returns An object with values of this device that can be passed to GUI
   */
  public toJSON() {
    return {
      type: this._type,
      id: this._id,
      label: this._label,
      fullLabel: this._fullLabel,
      options: this._options
    }
  }

  public get type() {
    return this._type
  }

  public get id() {
    return this._id
  }

  public get label() {
    return this._label
  }

  public get fullLabel() {
    return this._fullLabel
  }

  public get options() {
    return this._options
  }

}
