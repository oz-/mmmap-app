import { MobiuszDevice } from "@/libs/signal/classes";





export class MobiuszMIDIDevice extends MobiuszDevice {

  static signal = 'MIDI'

  constructor(type: 'input' | 'output', description: {
    deviceId: string,
    kind: string,
    label: string,
    groupId: string
  }) {

    super(type, description)

  }

}