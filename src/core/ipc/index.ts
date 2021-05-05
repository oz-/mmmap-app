/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { ipcMain } from 'electron'
import getPort from 'get-port'

import { M } from '@/shared'
import socket from './socket'
import { IpcSocketServer } from '@/libs/ipcsocket'

const MODULE_NAME = 'Ipc'

/**
 * A port on localhost to which the main IpcSocketServer is listening.
 * @see IpcSocketServer
 * @see IpcSocketClient
 * 
 * @memberof module:Ipc
 * @category Main
 */
let port = -1
/**
 * A IpcSocketServer object listening for windows connection.
 * @see IpcSocketServer
 * @see IpcSocketClient
 * 
 * @memberof module:Ipc
 * @category Main
 */
let server: IpcSocketServer | null = null

/**
 * Manages first handshake between windows and the main process via 
 * IpcMain Electron's module, then creates a socket connection 
 * between them.
 * 
 * @module Ipc
 * @category Main
 * @subcategory Communication
 * 
 * @exports init
 * @exports unref
 */

/**
 * Gets an available port on localhost to create a IpcSocketServer and listens 
 * to windows asking (via IpcMain) for the port, in order to connect to socket server.
 * 
 * @see IpcSocketServer
 */
const init = async () => {

  // Gets an available port on localhost
  port = await getPort()

  // TODO: counterpart to remove handler on quit
  ipcMain.handle(M.Ipc.GET_IPC_PORT, sendPort)

  // Creates a IpcSocketServer for windows to connect to.
  server = await socket.create(port)

}

/**
 * Destroys the server and stops listening to IpcMain event.
 */
const unref = () => {

  socket.unref()
  server = null
  port = -1

  // Removes IpcMain handler
  ipcMain.removeHandler(M.Ipc.GET_IPC_PORT)

}

/**
 * Callback: Sends the port number on which the IpcSocketServer is listening to window 
 * asking for it via IpcMain Electron's module.
 * 
 * @callback sendPort
 * @return { number } The port on which the IpcSocketServer is listening.
 */
const sendPort = () => {
    // Renderer process asks for the port to connect to
    return port
}

export default {
  name: MODULE_NAME,
  init,
  unref
}