import { MobiuszDeviceHandler } from "@/libs/signal/devices";
import { Device } from "../../devices/types";

import { AppManager } from '@/core/app/manager'

import { MobiuszMIDIDevice } from "../device";
import { config } from '../components/config'

import midi from 'midi'


// Resources
// see: https://www.npmjs.com/package/node-launchpad
// message format: 
//    https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message
//    https://www.midi.org/specifications-old/item/table-2-expanded-messages-list-status-bytes
//    https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2
// message format: https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html
// parsing: https://www.npmjs.com/package/midi-node
// convert to hex: https://www.npmjs.com/package/to-hex
// convert to note: https://github.com/tonaljs/tonal/tree/master/packages/midi
//  -> yarn add @tonaljs/midi
// Device controller: https://www.npmjs.com/package/midi-device-controller
// Get connected devices: https://www.npmjs.com/package/midi-ports (browser only?)
//
// Wrapper around node-midi to parse messages: https://www.npmjs.com/package/easymidi


export class MobiuszMIDIHandler extends MobiuszDeviceHandler {

  static category = Device.Category.DATA

  constructor(app: typeof AppManager) {
    super(app)
    /*
    const input = new midi.Input();

    // Count the available input ports.
    const count = input.getPortCount();
    for (let i = 0; i < count; i++) {
      // Get the name of a specified input port.
      console.log('open', input.isPortOpen(i))
      console.log(input.getPortName(i));
    }

    input.on('message', this._onMessage);
    input.ignoreTypes(false, false, false);
    // Open the first available input port.
    input.openPort(2);
    */
  }

  // Just for testing
  private _onMessage (deltaTime: any, message: any) {
    // The message is an array of numbers corresponding to the MIDI bytes:
      //   [status, data1, data2]
      // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
      // information interpreting the messages.
      console.log(`m: ${message} d: ${deltaTime}`);
      console.log('function', message[0].toString(16))
      console.log('note/cc', message[1].toString(16))
  }

  public addDevice(type: Device.Type, description: Device.Description) {

    this._devices.push(new MobiuszMIDIDevice(this, type, description))

  }

  public getDevices(json?: boolean) {

    return super.getDevices(config, json)

  }

}