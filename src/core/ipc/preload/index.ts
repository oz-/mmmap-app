/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { contextBridge, ipcRenderer } from 'electron'

const Bridge = {
  ipc: {
    send: (channel: string, ...args: any[]) => {
      ipcRenderer.send(channel, ...args)
    },
    invoke: async (channel: string, ...args: any[]) => {
      // @see https://stackoverflow.com/a/62630044/1060921
      // @see https://github.com/electron/electron/issues/21437
      return await ipcRenderer.invoke(channel, ...args)
    },
  }
}

contextBridge.exposeInMainWorld('app', Bridge)