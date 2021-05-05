import { MobiuszDevice } from "@/libs/signal/main/devices/device";
import { Device } from "../../main/devices/types";
import { MobiuszSerialHandler } from "../handler";





export class MobiuszSerialDevice extends MobiuszDevice {

  static signal = 'Serial'

  constructor(handler: MobiuszSerialHandler, type: Device.Type, description: Device.Description) {

    super(handler, type, description)

  }

}