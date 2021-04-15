import { Component, Vue } from 'vue-property-decorator'

import { SocketMessages, WindowMessages } from '@/shared'

import { VuozTitleBar, VuozTable, VuozTableRow, VuozPreferencesItem } from '@vuoz/components'
import { VueConstructor } from 'vue/types/umd'

import { VuozPreferencesAudioPanel, VuozPreferencesVideoPanel, VuozPreferencesOSCPanel, VuozPreferencesMIDIPanel, VuozPreferencesSerialPanel } from '../panels'

const icons = {
  Audio: 'volume_up',
  Video: 'tv',
  OSC: 'sensors',
  MIDI: 'grid_view',
  Serial: 'settings_ethernet'
}

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
    VuozTableRow,
    VuozPreferencesAudioPanel,
    VuozPreferencesVideoPanel
  },
  metaInfo() {
    return {
      title: "mmmap - Signals"
    }
  }
})
export default class SignalsPage extends Vue {

  private devices: {
    component: VueConstructor;
    name: string;
    props: {
      title: string;
      icon: string;
    };
    objects: any[];
  }[] = []

  private component: VueConstructor = VuozPreferencesAudioPanel

  private selected: {
    input?: any[];
    output?: any[]
  } = {}

  public mounted(): void {
    // Listens to window load event
    window.addEventListener('load', this.onLoaded)
  }

  private onLoaded() {
    // Window is fully loaded
    window.removeEventListener('load', this.onLoaded)
    // Asks for devices
    this.$app.send(SocketMessages.GET_DEVICES, 'all', (devices: any) => {
      // Organize in categories
      for (const key in devices.payload) {
        const description: any = {
          component: VuozPreferencesItem,
          name: `devices.${key.toLowerCase()}`,
          props: {
            title: key,
            icon: icons[key]
          },
          objects: devices.payload[key]
        }
        this.devices.push(description)
      }
    })
    // Sends message to main process
    this.$app.send(WindowMessages.LOADED, this.$route.name)
  }

  public onSelect(payload: any) {
    this.selected = this.devices[payload.row].objects as any
    switch (payload.item.name) {
      case 'device.audio': {
        this.component = VuozPreferencesAudioPanel
        break
      }
      case 'device.video': {
        this.component = VuozPreferencesVideoPanel
        break
      }
      case 'device.osc': {
        this.component = VuozPreferencesOSCPanel
        break
      }
      case 'device.midi': {
        this.component = VuozPreferencesMIDIPanel
        break
      }
      case 'device.serial': {
        this.component = VuozPreferencesSerialPanel
        break
      }
    }
  }

}


  /*
  = [
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
*/