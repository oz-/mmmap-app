import { MobiuszDeviceHandler } from "@/libs/signal/main/devices";
import { Device } from "../../main/devices/types";

import { AppManager } from '@/core/app/manager'

import { MobiuszSerialDevice } from "../device";
import { config } from '../components/config'

import SerialPort from 'serialport'

// Resources:
// https://www.npmjs.com/package/3d-printer-controller

// FIXME: not supporting Seeeduino Lotus
// see: https://github.com/rwaldron/johnny-five/wiki/Johnny-Five-and-Intel-IoTDevKit-Example-Sketches#getting-started
import { Board } from 'johnny-five'



export class MobiuszSerialHandler extends MobiuszDeviceHandler {

  static category = Device.Category.DATA

  private _ports: SerialPort.PortInfo[] = []

  constructor(app: typeof AppManager) {
    super(app)

    // Get the ports list
    const self = this
    SerialPort.list()
    .then(ports => {
      ports.forEach(function (port) {
        self._ports.push(port)
      })
    }).catch(err => {
      console.error(err)
    })
  }

  public addDevice(type: Device.Type, description: Device.Description) {

    this._devices.push(new MobiuszSerialDevice(this, type, description))

  }

  public getDevices(json?: boolean) {

    return super.getDevices(config, json)

  }

  public get ports() {
    return this._ports
  }

}