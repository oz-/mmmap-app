import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { VuozPreferencesPanel, VuozTable, VuozTableRow } from '@vuoz/components'
import VuozPreferencesVideoInputItem from '../../items/input/index.vue'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesVideoInputTab",
  components: {
    VuozPreferencesPanel,
    VuozTable,
    VuozTableRow,
    VuozPreferencesVideoInputItem
  }
})
export default class VuozPreferencesVideoInputTab extends Vue {

  @Prop({ type: Array, default: () => [] }) items!: any[]

  private inputs: any[] = []

  @Watch('items', { immediate: true })
  private onItemsChanged() {
    console.log(this.items)
    this.inputs = []
    for (const item of this.items) {
      this.inputs.push({
        component: VuozPreferencesVideoInputItem,
        props: {
          ...item
        }
      })
    }
    console.log(this.inputs)
  }

}
