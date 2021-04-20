/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { ipcMain } from 'electron'
import getPort from 'get-port'

import { IpcMessages } from '@/shared'
import socket from './socket'
import { SocketServer } from '@/libs/socket'

const MODULE_NAME = 'Ipc'

/**
 * A port on localhost to which the main SocketServer is listening.
 * @see SocketServer
 * @see SocketClient
 * 
 * @memberof module:Ipc
 * @category Main
 */
let port = -1
/**
 * A SocketServer object listening for windows connection.
 * @see SocketServer
 * @see SocketClient
 * 
 * @memberof module:Ipc
 * @category Main
 */
let server: SocketServer | null = null

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
 * Gets an available port on localhost to create a SocketServer and listens 
 * to windows asking (via IpcMain) for the port, in order to connect to socket server.
 * 
 * @see SocketServer
 */
const init = async () => {

  // Gets an available port on localhost
  port = await getPort()

  // TODO: counterpart to remove handler on quit
  ipcMain.handle(IpcMessages.GET_SOCKET_PORT, sendPort)

  // Creates a SocketServer for windows to connect to.
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
  ipcMain.removeHandler(IpcMessages.GET_SOCKET_PORT)

}

/**
 * Callback: Sends the port number on which the SocketServer is listening to window 
 * asking for it via IpcMain Electron's module.
 * 
 * @callback sendPort
 * @return { number } The port on which the SocketServer is listening.
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