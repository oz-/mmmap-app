import { Component, Prop, Vue } from 'vue-property-decorator'

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
