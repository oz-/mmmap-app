import { MobiuszDevice } from "@/libs/signal/devices";
import { Device } from "@/libs/signal/devices/types";
import { MobiuszMIDIHandler } from "../handler";





export class MobiuszMIDIDevice extends MobiuszDevice {

  static signal = 'MIDI'

  constructor(handler: MobiuszMIDIHandler, type: Device.Type, description: Device.Description) {

    super(handler, type, description)

  }

}