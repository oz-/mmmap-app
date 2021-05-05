import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'

// Global events hub (renderless component)
import { GlobalEvent } from '@/gui/events/global'

import { VuozTitleBar, VuozToolbar, VuozTabs, VuozSplitView, VuozTable, VuozTableRow } from '@vuoz/components'

// TODO: This is for debug only
import { mainToolbarItems } from '../toolbar/main.toolbar'
import { MainWindow } from '../../messages'

/**
 * Main window content.
 * @category Components
 * @component
 */
@Component({
  name: "MmmapMain",
  components: {
    VuozTitleBar,
    VuozToolbar,
    VuozSplitView,
    VuozTabs,
    VuozTable,
    VuozTableRow
  },
  metaInfo() {
    return {
      title: "mmmap"
    }
  },
  computed: {
    ...mapState('application', [
      'gui'
    ])
  }
})
export default class MainPage extends Vue {

  private items = mainToolbarItems
  // Assigned by mapState
  public gui: any
  public tabs: any
  public selectedTab = 0
  // FIXME: Fake users
  private users = [
    'Moi',
    'Un autre',
    'Encore un'
  ]

  @Watch('gui', { immediate: true, deep: true })
  private onGUIChanged() {
    this.tabs = this.gui.tabs
    this.selectedTab = this.gui.selectedTab
  }

  private onSelectMainTab(id: number) {
    GlobalEvent.$emit(MainWindow.Event.TAB_SELECT, id)
  }

  private onCloseMainTab(id: number) {
    GlobalEvent.$emit(MainWindow.Event.TAB_CLOSE, id)
  }

  private onDragMainTab(indexes: {
    oldIndex: number;
    newIndex: number;
  }) {
    GlobalEvent.$emit(MainWindow.Event.TAB_DRAG, indexes)
  }

  private onSplitView(name: string, size: any) {
    console.log(name, size)
    GlobalEvent.$emit('splitview:changed', {
      name,
      size
    })
  }

}