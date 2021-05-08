import { Component, Prop, Vue } from "vue-property-decorator";
import { VuozButton, VuozInput, VuozCheckbox } from '@vuoz/components'
import { Signal } from "@/libs/signal/shared";
/**
 * Vuoz table item for preferences window.
 * @displayName VuozPreferencesOSCOutputItem
 */
@Component({
  name: "VuozPreferencesOSCOutputItem",
  components: {
    VuozInput,
    VuozButton,
    VuozCheckbox
  }
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, required: true }) readonly name!: string
  @Prop({ type: String, default: '127.0.0.1' }) readonly host!: string
  @Prop({ type: String, default: '1234' }) readonly port!: string

  private deviceId = ''
  private label = this.name
  private address = this.host
  private portNumber = this.port
  // UI
  private button = 'Open'
  private disabled = false

  public onChange(type: string, event: any) {
    switch (type) {
      case 'name': {
        this.label = event.value
        break
      }
      case 'host': {
        this.address = event.value
        break
      }
      case 'port': {
        this.portNumber = event.value
        break
      }
    }
  }

  public onOpen(toggled: boolean) {
    if (toggled) {
      this.$app.on(Signal.Event.OSC.ERROR, this.onError)
      this.$app.send(Signal.Event.OSC.OUTPUT_OPEN, { label: this.label, options: { host: this.host, port: this.portNumber } }, (result: any) => {
        // Keeps the generated deviceId
        this.deviceId = result.payload.deviceId
        this.button = 'Running'
        this.disabled = true
      })
    } else {
      this.$app.send(Signal.Event.OSC.CLOSE, this.deviceId, (result: any) => {
        this.button = 'Open'
        this.disabled = false
      })
    }
  }

  private onError(err: Error) {

    // TODO: Recognize the device -> Handler must send the deviceId

    console.error(err)
    console.log(err.message)
    this.$app.send(Signal.Event.OSC.CLOSE, this.deviceId, (payload: any) => {
      this.$app.off(Signal.Event.OSC.ERROR, this.onError)
      this.disabled = false
      this.button = 'Open';
      (this.$refs.button as any).click(false)
    })
  }

  public onTest(toggle: boolean) {
    let value = 0
    if (toggle) {
      value = 1
    }
    this.$app.send(Signal.Event.OSC.EMIT, {
      device: this.deviceId,
      message: {
        address: "/fromMmmap/test",
        args: [
          {
            type: "i",
            value
          }
        ]
      }
    })
  }

}