import { Component, Vue } from 'vue-property-decorator';
import adapter from 'webrtc-adapter'

@Component
export class VuozRTCDevicesMixin extends Vue {

  public async enumerateDevices() {
    // Enumerate all media devices
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices
  }

}