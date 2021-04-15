import { Component, Prop, Vue } from 'vue-property-decorator'

import { SocketMessages, WindowMessages } from '@/shared'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesSerialOutputTab"
})
export default class VuozPreferencesSerialOutputTab extends Vue {

  @Prop({ type: Array, default: () => [] }) items!: any[]

}
