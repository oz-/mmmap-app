import { MobiuszDevice } from "@/libs/signal/devices";
import { Device } from "@/libs/signal/devices/types";
import { MobiuszVideoHandler } from "../handler";





export class MobiuszVideoDevice extends MobiuszDevice {

  static signal = 'Video'

  constructor(handler: MobiuszVideoHandler, type: Device.Type, description: Device.Description) {

    super(handler, type, description)

  }

}