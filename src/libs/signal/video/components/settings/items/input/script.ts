import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import { VuozButton, VuozInput, VuozCheckbox } from '@vuoz/components'

import { VuozRTCDevicesMixin } from '@/libs/signal/vue/mixins/VuozRTCDevicesMixin'

import { Signal } from "@/libs/signal/shared";
import { Video } from "@/libs/signal/video/messages";
/**
 * Vuoz table item for preferences window.
 * @displayName VuozPreferencesOSCOutputItem
 */
@Component({
  name: "VuozPreferencesVideoInputItem",
  components: {
    VuozInput,
    VuozButton,
    VuozCheckbox
  }
})
export default class VuozComponent extends Mixins(Vue, VuozRTCDevicesMixin) {

  @Prop({ type: String, required: true }) readonly label!: string;
  @Prop({ type: String }) readonly fulllabel!: string;
  @Prop({ type: String, required: true }) readonly id!: string;
  @Prop({ type: String }) readonly type!: string;

  private stream: MediaStream | null = null
  private loading = false

  private mounted() {
    // 
  }

  private updated() {
    console.log('UPDATED')
  }

  private activated() {
    console.log('Activated')
    if (this.stream) {
      (this.$refs.player as HTMLAudioElement).play()
    }
  }

  private deactivated() {
    console.log('Deactivated')
    if (this.stream) {
      (this.$refs.player as HTMLAudioElement).pause()
    }
  }

  private beforeDestroy() {
    console.log('DESTROY')
    this.onToggleMedia(false)
  }

  private onToggleMedia(toggle: boolean) {
    if (toggle) {
      this.loading = true
      this.$app.send(Video.Event.INPUT_OPEN, { id: this.id, options: {} }, async (result: any) => {
        this.stream = await this.openVideoInput(result.payload.device.id, { width: { ideal: 1280 }, height: { ideal: 720 } });
        if (this.stream) {
          (this.$refs.player as HTMLAudioElement).srcObject = this.stream;
          (this.$refs.player as HTMLAudioElement).play()
          const tracks = this.stream.getTracks()
          for (const track of tracks) {
            console.log(track.getCapabilities())
            console.log(track.getSettings())
          }
        }
        this.loading = false
      })
    } else {
      this.loading = true
      this.$app.send(Video.Event.INPUT_CLOSE, this.id, (result: any) => {
        if (this.stream) {
          (this.$refs.player as HTMLAudioElement).pause()
          const tracks = this.stream.getTracks()
          for (const track of tracks) {
            track.stop()
          }
          (this.$refs.player as HTMLAudioElement).srcObject = null
          this.stream = null
        }
        this.loading = false
      })
    }
  }

}