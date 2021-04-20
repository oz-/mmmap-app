import { Component, Vue } from 'vue-property-decorator'
import { VueConstructor } from 'vue/types/umd'
import { VuozPreferencesPanel, VuozButton, VuozInput, VuozCheckbox, VuozToolbar, VuozTable, VuozTableRow } from '@vuoz/components'
import VuozPreferencesOSCOutputItem from './items/emitter/index.vue'
import { Signal } from '../../../shared'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesOSCPanel",
  components: {
    VuozPreferencesPanel,
    VuozButton,
    VuozInput,
    VuozCheckbox,
    VuozToolbar,
    VuozTable,
    VuozTableRow,
    VuozPreferencesOSCOutputItem
  },
})
export default class VuozPreferencesOSCPanel extends Vue {

  private created() {

    this.$app.on(Signal.Event.OSC.MESSAGE, this.onMessage)

  }

  // Listener
  private deviceId = ''
  private label = 'OSC Input'
  private host = '0.0.0.0'
  private port = '3333'
  private button = 'Open'
  private loading = false
  private disabled = false
  private inputMessage = ''
  // Emitters
  private emitters: {
    component: VueConstructor;
    props: {
      name: string;
      host: string;
      port: string;
    }
  }[] = []
  /*
  private emitters = [
    'Bla',
    'Blue'
  ]
  */
  private selectedEmitter = -1
  private toolbar = [
    {
      icon: 'add',
      label: 'Add',
      type: 'push',
      rounded: true,
      name: 'osc:output:add',
      target: this,
      onDown(target: any, button: any) {
        target.onAddEmitter()
      }
    },
    {
      icon: 'remove',
      label: 'Remove',
      type: 'push',
      rounded: true,
      disabled: true,
      name: 'osc:output:remove',
      target: this,
      onDown(target: any, button: any) {
        target.onRemoveEmitter()
      }
    },
    {
      role: 'spacer'
    },
    {
      icon: 'show_chart',
      label: 'Monitor',
      type: 'toggle',
      toggle: 'primary',
      rounded: true,
      name: 'osc:monitor',
      target: this,
      onDown(target: any, button: any) {
        console.warn('TODO: show monitor')
      },
      onUp(target: any, button: any) {
        console.warn('TODO: hide monitor')
      }
    },
  ]

  private debugCounter = 0

  private onChange(input: string, event: any) {
    console.log(event)
    this[input] = event.value
  }

  private onOpen(toggled: boolean) {
    if (toggled) {
      this.loading = true
      this.disabled = true

      this.$app.on(Signal.Event.OSC.ERROR, this.onError)
      this.$app.send(Signal.Event.OSC.INPUT_OPEN, { label: this.label, options: { host: this.host, port: this.port } }, (result: any) => {
        // Keeps the generated deviceId
        this.deviceId = result.payload.deviceId
        this.loading = false
        this.button = 'Running'
      })
    } else {
      this.loading = true
      this.$app.send(Signal.Event.OSC.CLOSE, this.deviceId, (result: any) => {
        this.disabled = false
        this.loading = false
        this.button = 'Open'
      })
    }
  }

  private onError(err: Error) {

    // TODO: Recognize the device -> Handler must send the deviceId

    console.error(err)
    console.log(err.message)
    this.loading = true
    this.$app.send(Signal.Event.OSC.CLOSE, this.deviceId, (payload: any) => {
      this.$app.off(Signal.Event.OSC.ERROR, this.onError)
      this.disabled = false
      this.loading = false
      this.button = 'Open';
      (this.$refs.button as any).click(false)
    })
  }

  // TODO: Implement workers
  private onMessage(message: any) {
    // console.log(message);
    if (this.$refs.inputCheckbox) {
      (this.$refs.inputCheckbox as any).push(true)
      const time = setTimeout(() => {
        (this.$refs.inputCheckbox as any).push(false)
      }, 100)
    }
  }

  private onAddEmitter() {
    this.emitters.push({
      component: VuozPreferencesOSCOutputItem,
      props: {
        name: `OSC Output ${this.debugCounter}`,
        host: '127.0.0.1',
        port: `123${this.debugCounter}`
      }
    })
    this.debugCounter++
  }

  private onRemoveEmitter() {
    this.emitters.splice(this.selectedEmitter, 1)
  }

  private onSelectEmitter(selected: boolean, event?: any) {
    if (selected) {
      this.selectedEmitter = event.row
      this.toolbar[1].disabled = false
    } else {
      this.selectedEmitter = -1
      this.toolbar[1].disabled = true
    }
  }

}
