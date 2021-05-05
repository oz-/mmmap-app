import { MobiuszDevice } from "@/libs/signal/main/devices";
import { Device } from "@/libs/signal/main/devices/types";
import { MobiuszAudioHandler } from "../handler";





export class MobiuszAudioDevice extends MobiuszDevice {

  static signal = 'Audio'

  constructor(handler: MobiuszAudioHandler, type: Device.Type, description: Device.Description) {

    super(handler, type, description)

  }

}