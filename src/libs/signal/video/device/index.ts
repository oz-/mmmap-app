import { MobiuszDevice } from "@/libs/signal/classes";





export class MobiuszVideoDevice extends MobiuszDevice {

  static signal = 'Video'

  constructor(description: {
    deviceId: string,
    kind: string,
    label: string,
    groupId: string
  }) {

    super('input', description)

  }

}