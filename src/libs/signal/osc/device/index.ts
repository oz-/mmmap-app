import { MobiuszDevice } from "@/libs/signal/classes";
import osc from 'osc'




/**
 * @see https://www.npmjs.com/package/osc
 */
export class MobiuszOSCDevice extends MobiuszDevice {

  static signal = 'OSC'

  protected _address?: string
  protected _portNumber?: number
  protected _port?: any

  constructor(type: 'input' | 'output', description: {
    deviceId: string,
    kind: string,
    label: string,
    // Unused for the time being
    groupId: string
  }) {

    super(type, description)

    if (type === 'input') {
      this.createInputPort('0.0.0.0', 3333)
      this._port.on('message', this._onMessage)
      this.open()
    }

  }

  protected createInputPort(address: string, port: number) {
    this._address = address
    this._portNumber = port
    this._port = new osc.UDPPort({
      localAddress: this._address,
      localPort: this._portNumber,
      metadata: true
    });
  }

  public open() {
    if (this._port) {
      this._port.open()
    }
  }

  private _onMessage(oscMsg: any, timeTag: any, info: any) {
    console.log("An OSC message just arrived!", oscMsg);
    console.log('Time:', timeTag)
    console.log("Remote info is: ", info);
  }

}