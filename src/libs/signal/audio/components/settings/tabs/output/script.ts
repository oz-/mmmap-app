import { Component, Prop, Vue } from 'vue-property-decorator'

import { SocketMessages, WindowMessages } from '@/shared'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesAudioOutputTab"
})
export default class VuozPreferencesAudioOutputTab extends Vue {

  @Prop({ type: Array, default: () => [] }) items!: any[]

}
