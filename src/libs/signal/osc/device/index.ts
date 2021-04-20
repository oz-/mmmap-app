import { MobiuszDevice } from "@/libs/signal/devices";
import { MobiuszOSCHandler } from "../handler";

import { Device } from "@/libs/signal/devices/types";
import { OSC } from '../messages'

import osc from 'osc'





/**
 * @see https://www.npmjs.com/package/osc
 */
export class MobiuszOSCDevice extends MobiuszDevice {

  static signal = 'OSC'

  protected _address?: string
  protected _portNumber?: number
  protected _port?: any

  constructor(handler: MobiuszOSCHandler, type: Device.Type, description: Device.Description) {

    super(handler, type, description)

    if (type === 'input') {
      this.createInputPort(description.options.host, description.options.port)

      this._onMessage = this._onMessage.bind(this)

      // TODO: listen to 'osc' or 'data'
      this._port.on('message', this._onMessage)

    } else {

      // See https://github.com/colinbdclark/osc.js/issues/50
      // and check if it's opening an input port (address in use if 2 emitters)     => Checked: we have the error (TODO: available port)
      // then get available local port is this is the case.
      this.createOutputPort(description.options.host, description.options.port, description.options.local)

    }

    this._onReady = this._onReady.bind(this)
    this._onError = this._onError.bind(this)
    this._port.on('ready', this._onReady)
    this._port.on('error', this._onError)

    this.open()

  }

  public unref() {
    this.close()
    this._port.off('ready', this._onReady)
    this._port.off('message', this._onMessage)
    this._port.off('error', this._onError)
    super.unref()
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

  protected createOutputPort(address: string, port: number, local: number) {

    this._address = address
    this._portNumber = port
    this._port = new osc.UDPPort({
      localPort: local,
      remoteAddress: this._address,
      remotePort: this._portNumber
    });

  }

  public open() {
    if (this._port) {
      this._port.open()
    }
  }

  public close() {
    if (this._port) {
      this._port.close()
    }
  }

  public emitMessage(message: any) {
    this._port.send(message, this._address, this._portNumber)
  }

  private _onReady() {

    this._handler.emit(OSC.Event.READY, {
      id: this._id,
      label: this._label,
      host: this._address,
      port: this._portNumber
    })

  }

  private _onMessage(oscMsg: any, timeTag: any, info: any) {

    this._handler.emit(OSC.Event.MESSAGE, {
      device: { id: this._id, label: this._label, host: this._address, port: this._portNumber },
      message: oscMsg,
      time: timeTag,
      info
    })

  }

  private _onError(err: any) {

    console.log('TODO: OSC DEVICE ERROR')
    console.log(err)
    this._handler.emit(OSC.Event.ERROR, err)

  }

  public get portNumber() {
    return this._portNumber
  }

}