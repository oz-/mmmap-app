import { MobiuszDevice } from "@/libs/signal/class";





export class MobiuszAudioDevice extends MobiuszDevice {

  static signal = 'Audio'

  constructor(type: 'input' | 'output', description: {
    deviceId: string,
    kind: string,
    label: string,
    groupId: string
  }) {

    super(type, description)

  }

}