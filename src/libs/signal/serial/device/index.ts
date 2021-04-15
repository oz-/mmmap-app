import { MobiuszDevice } from "@/libs/signal/classes/device";





export class MobiuszSerialDevice extends MobiuszDevice {

  static signal = 'Serial'

  constructor(type: 'input' | 'output', description: {
    deviceId: string,
    kind: string,
    label: string,
    groupId: string
  }) {

    super(type, description)

  }

}