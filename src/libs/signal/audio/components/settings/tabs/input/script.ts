import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { VuozPreferencesPanel, VuozTable, VuozTableRow } from '@vuoz/components'
import VuozPreferencesAudioInputItem from '../../items/input/index.vue'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesAudioInputTab",
  components: {
    VuozPreferencesPanel,
    VuozTable,
    VuozTableRow,
    VuozPreferencesAudioInputItem
  }
})
export default class VuozPreferencesAudioInputTab extends Vue {

  @Prop({ type: Array, default: () => [] }) items!: any[]

  private inputs: any[] = []

  @Watch('items', { immediate: true })
  private onItemsChanged() {
    console.log(this.items)
    this.inputs = []
    for (const item of this.items) {
      this.inputs.push({
        component: VuozPreferencesAudioInputItem,
        props: {
          ...item
        }
      })
    }
    console.log(this.inputs)
  }

}
