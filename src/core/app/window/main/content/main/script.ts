import { Component, Vue } from 'vue-property-decorator'

import { SocketMessages, WindowMessages } from '@/shared'
// Global events hub (renderless component)
import { GlobalEvent } from '@/gui/events/global'

// Store's module
import { application } from '@/core/app/window/main/store'

import { VuozTitleBar } from '@vuoz/components'
import { VuozToolbar } from '@vuoz/components'
import { VuozTabs } from '@vuoz/components'
import { VuozSplitView } from '@vuoz/components'
// TODO: This is for debug only
import { debugItems } from './debug.items'
import { debugTabs } from './debug.tabs'

/**
 * Main window content.
 * @category Components
 * @component
 */
@Component({
  name: "MmmapMain",
  components: {
    VuozTitleBar,
    VuozToolbar,
    VuozSplitView,
    VuozTabs
  },
  metaInfo() {
    return {
      title: "mmmap"
    }
  }
})
export default class MainPage extends Vue {

  private items = debugItems
  private tabs = debugTabs

  public created () {
    // Registers our application module
    this.$store.registerModule('application', application)
    console.log(this.$store)
    this.$app.send(SocketMessages.SET_STORE, { application: { test: true }})
  }

  public mounted(): void {
    // Listens to window load event
    window.addEventListener('load', this.onLoaded)
    this.$app.send(SocketMessages.GET_STORE, null, (value: any) => {
      console.log(value)
    })
  }

  public beforeDestroy(): void {
    // 
  }

  private onLoaded() {
    // Window is fully loaded
    window.removeEventListener('load', this.onLoaded)
    // Sends message to main process
    this.$app.send(WindowMessages.LOADED, this.$route.name)
  }

  private onSplitView(name: string, size: any) {
    console.log(name, size)
    GlobalEvent.$emit('splitview:changed', {
      name,
      size
    })
  }

}