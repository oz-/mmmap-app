import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { VuozPreferencesPanel } from '@vuoz/components'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesMIDIPanel",
  components: {
    VuozPreferencesPanel,
  },
})
export default class VuozPreferencesMIDIPanel extends Vue {

  @Watch('items', { immediate: true })
  onItemsChanged() {
    // 
  }

}
