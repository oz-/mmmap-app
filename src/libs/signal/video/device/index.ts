import { MobiuszDevice } from "@/libs/signal/main/devices";
import { Device } from "@/libs/signal/main/devices/types";
import { MobiuszVideoHandler } from "../handler";





export class MobiuszVideoDevice extends MobiuszDevice {

  static signal = 'Video'

  constructor(handler: MobiuszVideoHandler, type: Device.Type, description: Device.Description) {

    super(handler, type, description)

  }

}