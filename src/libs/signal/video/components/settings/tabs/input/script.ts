import { Component, Prop, Vue } from 'vue-property-decorator'

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
