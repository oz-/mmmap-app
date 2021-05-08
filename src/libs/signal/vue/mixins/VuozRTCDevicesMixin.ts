import { Component, Vue } from 'vue-property-decorator';
import adapter from 'webrtc-adapter'

@Component
export class VuozRTCDevicesMixin extends Vue {

  public async enumerateDevices() {
    // Enumerate all media devices
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices
  }

  public async openAudioInput(id: string, constraints: any) {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: {
            exact: id
          },
          ...constraints
        }
      })
      return media
    } catch(err) {
      console.log(err)
      return null
    }
  }

  public async openVideoInput(id: string, constraints: any) {
    try {
      console.log(navigator.mediaDevices.getSupportedConstraints())
      const media = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: {
            exact: id
          },
          ...constraints
        }
      })
      return media
    } catch(err) {
      console.log(err)
      return null
    }
  }

}