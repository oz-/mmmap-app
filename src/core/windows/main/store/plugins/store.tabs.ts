import Vue from 'vue'

import { MainWindow } from '@/core/windows/main/messages'
import { ApplicationMutationTypes } from '../mutations'
import { Store } from "vuex"
import { GlobalEvent } from '@/gui/events/global'




// Tabs components
import { whiteboardTab } from '../../content/tabs/whiteboard'





// TODO: Automatic recordiing in Electron persistent store
// se store.subscribe at https://next.vuex.vuejs.org/guide/plugins.html
export const initTabsPlugin = (store: Store<any>) => {

  // TODO: inform the main process
  GlobalEvent.$on(MainWindow.Event.TAB_OPEN, (name: string) => {
    switch(name) {
      case 'mmmap:tab:whiteboard': {
        store.commit(`application/${ApplicationMutationTypes.TAB_OPEN}`, whiteboardTab)
      }
    }
  })

  GlobalEvent.$on(MainWindow.Event.TAB_CLOSE, (id: number) => {
    store.commit(`application/${ApplicationMutationTypes.TAB_CLOSE}`, id)
  })

  GlobalEvent.$on(MainWindow.Event.TAB_SELECT, (id: number) => {
    store.commit(`application/${ApplicationMutationTypes.TAB_SELECT}`, id)
  })

  GlobalEvent.$on(MainWindow.Event.TAB_DRAG, (indexes: {
    oldIndex: number;
    newIndex: number;
  }) => {
    store.commit(`application/${ApplicationMutationTypes.TAB_DRAG}`, indexes)
  })

}