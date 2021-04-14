import { Component, Vue } from 'vue-property-decorator'

import { SocketMessages, WindowMessages } from '@/shared'

import { VuozTitleBar, VuozTable, VuozTableRow, VuozPreferencesItem } from '@vuoz/components'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "MmmapSignals",
  components: {
    VuozTitleBar,
    VuozTable,
    VuozTableRow
  },
  metaInfo() {
    return {
      title: "mmmap - Signals"
    }
  }
})
export default class SignalsPage extends Vue {

  private devices = [
    {
      component: VuozPreferencesItem,
      name: 'devices.video',
      props: {
        title: 'Video',
        icon: 'tv'
      }
    },
    {
      component: VuozPreferencesItem,
      name: 'devices.audio',
      props: {
        title: 'Audio',
        icon: 'volume_up'
      }
    },
    {
      component: VuozPreferencesItem,
      name: 'signals.osc',
      props: {
        title: 'OSC',
        icon: 'sensors'
      }
    },
    {
      component: VuozPreferencesItem,
      name: 'signals.midi',
      props: {
        title: 'MIDI',
        icon: 'videogame_asset'
      }
    }
  ]

  public mounted(): void {
    console.log(this.devices)
    // Listens to window load event
    window.addEventListener('load', this.onLoaded)
  }

  private onLoaded() {
    // Window is fully loaded
    window.removeEventListener('load', this.onLoaded)
    // Asks for devices
    this.$app.send(SocketMessages.GET_DEVICES, 'all', (devices: any) => {
      console.log(devices)
    })
    // Sends message to main process
    this.$app.send(WindowMessages.LOADED, this.$route.name)
  }

  public onSelect(payload: any) {
    console.log(payload)
  }
}