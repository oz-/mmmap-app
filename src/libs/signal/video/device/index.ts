import { MobiuszDevice } from "@/libs/signal/main/devices";
import { Device } from "@/libs/signal/main/devices/types";
import { MobiuszVideoHandler } from "../handler";





export class MobiuszVideoDevice extends MobiuszDevice {

  static signal = 'Video'
  // Status
  private _open = false

  constructor(handler: MobiuszVideoHandler, type: Device.Type, description: Device.Description) {

    super(handler, type, description)

  }

  public open() {
    this._open = true
  }

  public close() {
    this._open = false
  }

  public toJSON() {
    const description = super.toJSON()
    return {
      ...description,
      open: this._open
    }
  }

  public get isOpen() {
    return this._open
  }

}