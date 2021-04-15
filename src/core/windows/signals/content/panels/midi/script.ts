import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { SocketMessages, WindowMessages } from '@/shared'

import { VuozPreferencesPanel, VuozTabs } from '@vuoz/components'
import { VuozPreferencesMIDIInputTab, VuozPreferencesMIDIOutputTab } from './tabs'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesMIDIPanel",
  components: {
    VuozPreferencesPanel,
    VuozTabs
  },
})
export default class VuozPreferencesMIDIPanel extends Vue {

  @Prop({ type: Object, required: true }) items!: { input?: any[]; output?: any[] }

  private tabs: any[] = []

  @Watch('items', { immediate: true })
  onItemsChanged() {
    console.log(this.items)
    this.tabs = []
    let id = 0
    for (const key in this.items) {
      console.log(key)
      this.tabs.push({
        id,
        title: key.charAt(0).toUpperCase() + key.slice(1) + 's',
        closable: false,
        component: {
          object: key === 'input' ? VuozPreferencesMIDIInputTab : VuozPreferencesMIDIOutputTab,
          props: {
            items: this.items[key]
          }
        }
      })
      id++
    }
  }

}
