import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { VuozPreferencesPanel, VuozTabs } from '@vuoz/components'
import { VuozPreferencesVideoInputTab, VuozPreferencesVideoOutputTab } from './tabs'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesVideoPanel",
  components: {
    VuozPreferencesPanel,
    VuozTabs
  },
})
export default class VuozPreferencesVideoPanel extends Vue {

  @Prop({ type: Object, required: true }) items!: { input?: any[]; output?: any[] }

  private tabs: any[] = []

  @Watch('items', { immediate: true })
  onItemsChanged() {
    this.tabs = []
    let id = 0
    for (const key in this.items) {
      this.tabs.push({
        id,
        title: key.charAt(0).toUpperCase() + key.slice(1) + 's',
        closable: false,
        component: {
          object: key === 'input' ? VuozPreferencesVideoInputTab : VuozPreferencesVideoOutputTab,
          props: {
            items: this.items[key]
          }
        }
      })
      id++
    }
  }

}
