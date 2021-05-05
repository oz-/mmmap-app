import { Component, Prop, Vue } from "vue-property-decorator";
import { VuozButton, VuozInput, VuozCheckbox } from '@vuoz/components'
import { Signal } from "@/libs/signal/shared";
/**
 * Vuoz table item for preferences window.
 * @displayName VuozPreferencesOSCOutputItem
 */
@Component({
  name: "VuozPreferencesAudioInputItem",
  components: {
    VuozInput,
    VuozButton,
    VuozCheckbox
  }
})
export default class VuozComponent extends Vue {

  @Prop({ type: String, required: true }) readonly label!: string;
  @Prop({ type: String }) readonly fulllabel!: string;
  @Prop({ type: String, required: true }) readonly id!: string;
  @Prop({ type: String }) readonly type!: string;

  private mounted() {
    //
  }

  private beforeDestroy() {
    //
  }

}