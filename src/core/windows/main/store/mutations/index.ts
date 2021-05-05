import { ApplicationState } from '../state'




export enum ApplicationMutationTypes {
  // Ipc
  IPC_CONNECTION = 'ipc:connection',
  // Server
  SERVER_CONNECTION = 'server:connection',
  SERVER_RECONNECTION = 'server:reconnection',
  // Tabs
  TAB_OPEN = 'tab:open',
  TAB_CLOSE = 'tab:close',
  TAB_SELECT = 'tab:select',
  TAB_DRAG = 'tab:drag'
}

export const mutations = {
  /**
   * Commits connection state to the main process.
   * @param state 
   * @param value 
   */
  [ApplicationMutationTypes.IPC_CONNECTION]: (state: ApplicationState, value: boolean) => {
    state.ipc.connected = value
  },

  // Server
  [ApplicationMutationTypes.SERVER_CONNECTION]: (state: ApplicationState, value: boolean) => {
    console.log('MUTATING')
    state.server.connected = value
  },
  [ApplicationMutationTypes.SERVER_RECONNECTION]: (state: ApplicationState, value: boolean) => {
    state.server.reconnecting = value
  },

  // Tabs
  [ApplicationMutationTypes.TAB_OPEN]: (state: ApplicationState, value: any) => {
    // Increment tab ID
    state.gui.lastTabId++
    // Push tab
    state.gui.tabs.push({
      id: state.gui.lastTabId,
      ...value
    })
    // Set selected
    state.gui.selectedTab = state.gui.lastTabId
  },

  [ApplicationMutationTypes.TAB_SELECT]: (state: ApplicationState, id: number) => {
    // Set selected
    state.gui.selectedTab = id
  },

  [ApplicationMutationTypes.TAB_CLOSE]: (state: ApplicationState, id: number) => {
    // Gets the tab with id
    const tab = state.gui.tabs.find(t => t.id === id)
    const index = state.gui.tabs.indexOf(tab)
    // Splice the tabs array
    state.gui.tabs.splice(index, 1)
  },

  [ApplicationMutationTypes.TAB_DRAG]: (state: ApplicationState, indexes: {
    oldIndex: number;
    newIndex: number;
  }) => {
    // Switch tabs
    state.gui.tabs.splice(indexes.oldIndex, 1, state.gui.tabs.splice(indexes.newIndex, 1, state.gui.tabs[indexes.oldIndex])[0])
  }

}