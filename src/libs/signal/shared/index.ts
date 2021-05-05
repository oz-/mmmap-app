import { OSC } from '../osc/messages'




export const Signal = {
  Event: {
    // Classes events
    OSC: OSC.Event,
    // Global events
    GUI: {
      // Sent by the Renderer process when user's devices were enumerated
      PARSE_DEVICES:                                    'signal:gui:devices:parse',
    }
  }
}