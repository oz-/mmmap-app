




export interface ApplicationState {
  ipc: {
    connected: boolean;
  },
  server: {
    connected: boolean;
    reconnecting: boolean;
  },
  gui: {
    lastTabId: number;
    tabs: any[];
    selectedTab: number;
    sidebar: {
      left: number;
      right: number;
      top: any[];
      bottom: any[];
    }
  }
}

export const state: ApplicationState = {
  ipc: {
    connected: false
  },
  server: {
    connected: false,
    reconnecting: false
  },
  gui: {
    lastTabId: 0,
    tabs: [
      {
        id: 0,
        title: 'Dashboard',
        content: 'Dashboard',
        closable: false
      }
    ],
    selectedTab: 0,
    sidebar: {
      left: 0,
      right: 0,
      top: [],
      bottom: []
    }
  }
}

