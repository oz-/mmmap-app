import { MobiuszDeviceHandler } from "@/libs/signal/main/devices";
import { Device } from "../../main/devices/types";

import { AppManager } from '@/core/app/manager'

import { MobiuszVideoDevice } from "../device";
import { config } from '../components/config'





export class MobiuszVideoHandler extends MobiuszDeviceHandler {

  static category = Device.Category.AV

  constructor(app: typeof AppManager) {
    super(app)
  }

  public addDevice(type: Device.Type, description: Device.Description) {

    this._devices.push(new MobiuszVideoDevice(this, type, description))

  }

  public getDevices(json?: boolean) {

    return super.getDevices(config, json)

  }

}