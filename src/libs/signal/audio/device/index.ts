import { MobiuszDevice } from "@/libs/signal/devices";
import { Device } from "@/libs/signal/devices/types";
import { MobiuszAudioHandler } from "../handler";





export class MobiuszAudioDevice extends MobiuszDevice {

  static signal = 'Audio'

  constructor(handler: MobiuszAudioHandler, type: Device.Type, description: Device.Description) {

    super(handler, type, description)

  }

}