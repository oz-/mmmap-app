import { Component, Prop, Vue } from 'vue-property-decorator'

import { SocketMessages, WindowMessages } from '@/shared'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesMIDIOutputTab"
})
export default class VuozPreferencesMIDIOutputTab extends Vue {

  @Prop({ type: Array, default: () => [] }) items!: any[]

}
