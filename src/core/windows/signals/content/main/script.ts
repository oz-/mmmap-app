import { Component, Vue } from 'vue-property-decorator'

import { SocketMessages, WindowMessages } from '@/shared'

import { VuozTitleBar, VuozTable, VuozTableRow, VuozPreferencesItem } from '@vuoz/components'
import { VueConstructor } from 'vue/types/umd'

import { VuozPreferencesAudioPanel } from '@/libs/signal/vue'

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
    VuozPreferencesAudioPanel
  },
  metaInfo() {
    return {
      title: "mmmap - Signals"
    }
  }
})
export default class SignalsPage extends Vue {

  private rows: {
    component: VueConstructor;
    name: string;
    props: {
      title: string;
      icon: string;
    };
    objects: any[];
  }[] = []

  public component: any = () => import('@/libs/signal/audio/components/settings/index.vue')
  private selected: {
    input?: any[];
    output?: any[]
  } = {}

  public created(): void {
    // Listens to window load event
    // @see also: @hook:mounted="onLoaded"
    window.addEventListener('load', this.onLoaded)
  }

  private onLoaded() {
    // Window is fully loaded
    window.removeEventListener('load', this.onLoaded)
    // Asks for devices
    this.$app.send(SocketMessages.GET_DEVICES, 'all', (devices: any) => {
      // Organize by signal category (audio, video, ...)
      devices.payload.forEach((device: any) => {
        // Object for tab description
        const description: any = {
          component: VuozPreferencesItem,
          name: `category.${device.gui.globalName.toLowerCase()}`,
          props: {
            title: device.gui.globalName,
            icon: device.gui.settings.icon
          },
          // Actual devices description.
          objects: device.devices
        }
        this.rows.push(description)
      })
      // Sends message to main process
      this.$app.send(WindowMessages.LOADED, this.$route.name)
    })
  }

  public onSelect(payload: any) {
    this.selected = this.rows[payload.row].objects as any
    switch (payload.item.name) {
      case 'category.audio': {
        this.component = () => import('@/libs/signal/audio/components/settings/index.vue')
        break
      }
      case 'category.video': {
        this.component = () => import('@/libs/signal/video/components/settings/index.vue')
        break
      }
      case 'category.osc': {
        this.component = () => import('@/libs/signal/osc/components/settings/index.vue')
        break
      }
      case 'category.midi': {
        this.component = () => import('@/libs/signal/midi/components/settings/index.vue')
        break
      }
      case 'category.serial': {
        this.component = () => import('@/libs/signal/serial/components/settings/index.vue')
        break
      }
    }
  }

}