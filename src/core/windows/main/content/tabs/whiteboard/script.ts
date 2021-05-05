import { Component, Vue } from 'vue-property-decorator'

// Global events hub (renderless component)
import { GlobalEvent } from '@/gui/events/global'
import { VuozWhiteBoard } from '@vuoz/components'
import 'vue-swatches/dist/vue-swatches.css'

/**
 * Whiteboard tab.
 * @category Components
 * @component
 */
@Component({
  name: "MmmapWhiteBoardTab",
  components: {
    VuozWhiteBoard
  }
})
export default class MmmapWhiteboardTab extends Vue {


  
}