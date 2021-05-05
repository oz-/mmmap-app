/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import WebSocket from 'ws'
import { v4 as uuidv4 } from 'uuid'

// Superclass
import { IpcSocketObject } from '../main'

// Messages
import { IpcSocket, _reservedEvents } from '../types'





/**
 * @classdesc Object that represents a server which accepts connections from IpcSocketClient.
 * @class
 * @augments IpcSocketObject
 * @category Libs
 * @subcategory IPC IpcSockets
 * @see IpcSocketClient
 */
export class IpcSocketServer extends IpcSocketObject {

  private _wss!: WebSocket.Server | null
  // Keep clients with their ids
  private _clients = {}

  /**
   * Creates a new IpcSocketServer object.
   * @constructor
   * @param {number} port The port to be opened.
   * @param {object} messages Allowed messages between server and client.
   */
  constructor(port: number) {

    super(port)

    this._timeout = 500

    this.connect()

  }
  /**
   * Calls superclass unref method, then tears down WebSocket server.
   * @public
   */
  public unref(): void {

    super.unref()

    this.disconnect()

  }
  /**
   * Creates a WebSocket server, adds listeners for static messages and launches the ping/pong exchange with connected sockets.
   * @private
   */
  private connect() {

    // Creates server
    // TODO: ws options
    this._wss = new WebSocket.Server({ port: this._port })

    // Launch heartbeat
    // TODO: milliseonds
    this.launchHeartbeat(this._timeout)

    // Add listeners to standard messages
    this.onListening = this.onListening.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.onConnection = this.onConnection.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onError = this.onError.bind(this)

    this._wss.on(IpcSocket.Server.Event.LISTENING, this.onListening)
    this._wss.on(IpcSocket.Server.Event.OPEN, this.onOpen)
    this._wss.on(IpcSocket.Server.Event.CONNECTION, this.onConnection)
    this._wss.on(IpcSocket.Server.Event.CLOSE, this.onClose)
    this._wss.on(IpcSocket.Event.ERROR, this.onError)

  }
  /**
   * Resets ping/pong timers, removes static listeners on WebSocket events and destroy server.
   * @protected
   */
  protected disconnect(): void {

    super.disconnect()

    // Remove listeners to standard messages
    this._wss!.off(IpcSocket.Server.Event.LISTENING, this.onListening)
    this._wss!.off(IpcSocket.Server.Event.OPEN, this.onOpen)
    this._wss!.off(IpcSocket.Server.Event.CONNECTION, this.onConnection)
    this._wss!.off(IpcSocket.Server.Event.CLOSE, this.onClose)
    this._wss!.off(IpcSocket.Event.ERROR, this.onError)

    // Close server
    this._wss!.close()
    this._wss = null

  }

  private onListening() {
    if (this._listeners[IpcSocket.Server.Event.LISTENING]) {
      this._listeners[IpcSocket.Server.Event.LISTENING].forEach((listener: ((...args: any[]) => any)) => {
        listener()
      })
    }
  }

  private onOpen() {

    if (this._listeners[IpcSocket.Server.Event.OPEN]) {
      this._listeners[IpcSocket.Server.Event.OPEN].forEach((listener: ((...args: any[]) => any)) => {
        listener()
      })
    }

  }

  private onConnection(socket: WebSocket) {

    // Assign id to socket
    const id: string = uuidv4();
    (socket as any).id = id
    // Manages messages
    socket.on(IpcSocket.Server.Event.MESSAGE, ((message: string) => {
      this.onMessage(socket, message)
    }).bind(this))
    // Informs listeners that a client connected
    if (this._listeners[IpcSocket.Server.Event.CONNECTION]) {
      this._listeners[IpcSocket.Server.Event.CONNECTION].forEach((listener: ((...args: any[]) => any)) => {

        const socketListeners = {}
        // Creates a new client, for the caller to listen to.
        // FIXME: use a IpcSocketClient object.
        const client = {
          id,
          socket,
          listeners: socketListeners,
          on: (channel: string, listener: ((...args: any[]) => any)): void => {
            socketListeners[channel] = listener
          },
          off: (channel: string) => {
            delete socketListeners[channel]
          },
          // Attach a function to this property to listen to all events.
          onevent: null,
          callback: (payload: any) => {
            socket.send(JSON.stringify({
              channel: _reservedEvents.___RESPONSE,
              payload
            }))
          },
          send: (channel: string, payload: any) => {
            socket.send(JSON.stringify({
              channel,
              payload
            }))
          }
        }

        // Keep socket with its id
        this._clients[(socket as any).id] = client

        // Sends the client object to listeners
        listener(client)
      })
    }

  }

  private onClose() {

    clearInterval(this._heartbeat)

    if (this._listeners[IpcSocket.Server.Event.CLOSE]) {
      this._listeners[IpcSocket.Server.Event.CLOSE].forEach((listener: ((...args: any[]) => any)) => {
        listener()
      })
    }

  }

  private onError(err: Error) {

    if (this._listeners[IpcSocket.Event.ERROR]) {
      this._listeners[IpcSocket.Event.ERROR].forEach((listener: ((...args: any[]) => any)) => {
        listener({
          error: err
        })
      })
    }

  }

  private onMessage(socket: WebSocket, message: string) {

    const content = JSON.parse(message)
    const channel = content.channel
    const payload = content.payload

    switch (channel) {
      case _reservedEvents.___PING: {
        socket.send(JSON.stringify({ channel: _reservedEvents.___PONG }))
        break
      }
      case _reservedEvents.___PONG: {
        clearTimeout((socket as any)._pong)
        break
      }
      default: {
        const client = this._clients[(socket as any).id]
        if (client) {
          if (client.listeners[channel]) {
            // Calls the function attached to specific channel's listener
            client.listeners[channel](payload)
          }
          if (client.onevent) {
            // Calls the function defined on property 'onevent'
            client.onevent({
              channel,
              payload
            })
          }
        }
        break
      }
    }

  }

  private launchHeartbeat(milliseconds: number) {

    this._heartbeat = setInterval(() => {
      this._wss!.clients.forEach((socket: WebSocket) => {
        // Wait for a pong from server for 'milliseconds'
        this.waitForPong(socket, milliseconds)
        // Ping the socket
        socket.send(JSON.stringify({ channel: _reservedEvents.___PING }))
      })
    }, milliseconds)

  }

  private waitForPong(socket: WebSocket, milliseconds: number) {
    (socket as any)._pong = setTimeout(() => {
      socket.terminate()
      // Delete in our clients array
      // FIXME: unref correctly and begin by sending a 'disconnect' event to listeners.
      delete this._clients[(socket as any).id]
    }, milliseconds)

  }

}