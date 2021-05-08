import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import { VuozButton, VuozInput, VuozCheckbox } from '@vuoz/components'

import { VuozRTCDevicesMixin } from '@/libs/signal/vue/mixins/VuozRTCDevicesMixin'

import { Signal } from "@/libs/signal/shared";
import { Audio } from "@/libs/signal/audio/messages";
/**
 * Vuoz table item for preferences window.
 * @displayName VuozPreferencesOSCOutputItem
 */
@Component({
  name: "VuozPreferencesAudioInputItem",
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

  private mounted() {
    //
  }

  private beforeDestroy() {
    //
  }

  private onToggleMedia(toggle: boolean) {
    if (toggle) {
      console.log('OPEN', this.id)
      this.$app.send(Audio.Event.INPUT_OPEN, { id: this.id, options: {} }, async (result: any) => {
        console.log(result.payload)
        this.stream = await this.openAudioInput(result.payload.device.id, { echoCancellation: true });
        // (this.$refs.player as HTMLAudioElement).srcObject = this.stream;
        // (this.$refs.player as HTMLAudioElement).play()
      })
    } else {
      console.log('CLOSE')
      this.$app.send(Audio.Event.INPUT_CLOSE, this.id, (result: any) => {
        if (this.stream) {
          // (this.$refs.player as HTMLAudioElement).pause()
          const tracks = this.stream.getTracks()
          for (const track of tracks) {
            track.stop()
          }
          // (this.$refs.player as HTMLAudioElement).srcObject = null
          this.stream = null
        }
      })
    }
  }

}