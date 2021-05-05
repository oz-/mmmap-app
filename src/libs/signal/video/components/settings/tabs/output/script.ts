import { Component, Prop, Vue } from 'vue-property-decorator'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "VuozPreferencesVideoOutputTab"
})
export default class VuozPreferencesVideoOutputTab extends Vue {

  @Prop({ type: Array, default: () => [] }) items!: any[]

}
