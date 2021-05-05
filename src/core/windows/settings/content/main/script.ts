import { Component, Vue } from 'vue-property-decorator'

import { M } from '@/shared'

import { VuozTitleBar } from '@vuoz/components'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "MmmapSettings",
  components: {
    VuozTitleBar
  },
  metaInfo() {
    return {
      title: "mmmap - Preferences"
    }
  }
})
export default class SettingsPage extends Vue {

  public mounted(): void {
    // Listens to window load event
    window.addEventListener('load', this.onLoaded)
  }

  private onLoaded() {
    // Window is fully loaded
    window.removeEventListener('load', this.onLoaded)
    // Sends message to main process
    this.$app.send(M.Window.LOADED, this.$route.name)
  }

}