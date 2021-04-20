import { MobiuszDeviceHandler } from "@/libs/signal/devices";
import { Device } from "../../devices/types";

import { AppManager } from '@/core/app/manager'

import { MobiuszAudioDevice } from "../device";
import { config } from '../components/config'





export class MobiuszAudioHandler extends MobiuszDeviceHandler {

  static category = Device.Category.AV

  constructor(app: typeof AppManager) {
    super(app)
  }

  public addDevice(type: Device.Type, description: Device.Description) {

    this._devices.push(new MobiuszAudioDevice(this, type, description))

  }

  public getDevices(json?: boolean) {

    return super.getDevices(config, json)

  }

}