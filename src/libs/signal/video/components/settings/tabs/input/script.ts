import { Component, Prop, Vue } from 'vue-property-decorator'

import { SocketMessages, WindowMessages } from '@/shared'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesVideoInputTab"
})
export default class VuozPreferencesVideoInputTab extends Vue {

  @Prop({ type: Array, default: () => [] }) items!: any[]

}
