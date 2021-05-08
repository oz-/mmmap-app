import { Audio } from '../audio/messages'
import { OSC } from '../osc/messages'




export const Signal = {
  Event: {
    // Classes events
    Audio: Audio.Event,
    OSC: OSC.Event,
    // Global events
    Devices: {
      // Sent by the Renderer process when user's devices were enumerated
      REGISTER:                                         'signal:devices:register',
    }
  }
}