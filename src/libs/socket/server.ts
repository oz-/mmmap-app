/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import WebSocket from 'ws'
import { v4 as uuidv4 } from 'uuid'

// Superclass
import { SocketObject } from './main'

// Messages
import { StaticMessages } from './messages'





/**
 * @classdesc Object that represents a server which accepts connections from SocketClient.
 * @class
 * @augments SocketObject
 * @category Libs
 * @subcategory IPC Sockets
 * @see SocketClient
 */
export class SocketServer extends SocketObject {

  private _wss!: WebSocket.Server | null
  // Keep clients with their ids
  private _clients = {}

  /**
   * Creates a new SocketServer object.
   * @constructor
   * @param {number} port The port to be opened.
   * @param {object} messages Allowed messages between server and client.
   */
  constructor(port: number, messages: { [key: string]: string }) {

    super(port, messages)

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

    this._wss.on(StaticMessages.LISTENING, this.onListening)
    this._wss.on(StaticMessages.OPEN, this.onOpen)
    this._wss.on(StaticMessages.CONNECTION, this.onConnection)
    this._wss.on(StaticMessages.CLOSE, this.onClose)
    this._wss.on(StaticMessages.ERROR, this.onError)

  }
  /**
   * Resets ping/pong timers, removes static listeners on WebSocket events and destroy server.
   * @protected
   */
  protected disconnect(): void {

    super.disconnect()

    // Remove listeners to standard messages
    this._wss!.off(StaticMessages.LISTENING, this.onListening)
    this._wss!.off(StaticMessages.OPEN, this.onOpen)
    this._wss!.off(StaticMessages.CONNECTION, this.onConnection)
    this._wss!.off(StaticMessages.CLOSE, this.onClose)
    this._wss!.off(StaticMessages.ERROR, this.onError)

    // Close server
    this._wss!.close()
    this._wss = null

  }

  private onListening() {
    if (this._listeners[StaticMessages.LISTENING]) {
      this._listeners[StaticMessages.LISTENING].forEach((listener: ((...args: any[]) => any)) => {
        listener()
      })
    }
  }

  private onOpen() {

    if (this._listeners[StaticMessages.OPEN]) {
      this._listeners[StaticMessages.OPEN].forEach((listener: ((...args: any[]) => any)) => {
        listener()
      })
    }

  }

  private onConnection(socket: WebSocket) {

    // Assign id to socket
    const id: string = uuidv4();
    (socket as any).id = id
    // Manages messages
    socket.on(StaticMessages.MESSAGE, ((message: string) => {
      this.onMessage(socket, message)
    }).bind(this))
    // Informs listeners that a client connected
    if (this._listeners[StaticMessages.CONNECTION]) {
      this._listeners[StaticMessages.CONNECTION].forEach((listener: ((...args: any[]) => any)) => {

        const socketListeners = {}
        // Creates a new client, for the caller to listen to.
        // FIXME: use a SocketClient object.
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
              channel: StaticMessages.WS_RESPONSE,
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

    if (this._listeners[StaticMessages.CLOSE]) {
      this._listeners[StaticMessages.CLOSE].forEach((listener: ((...args: any[]) => any)) => {
        listener()
      })
    }

  }

  private onError(err: Error) {

    if (this._listeners[StaticMessages.ERROR]) {
      this._listeners[StaticMessages.ERROR].forEach((listener: ((...args: any[]) => any)) => {
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
      case StaticMessages.PING: {
        socket.send(JSON.stringify({ channel: 'pong' }))
        break
      }
      case StaticMessages.PONG: {
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
        socket.send(JSON.stringify({ channel: StaticMessages.PING }))
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