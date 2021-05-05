/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

// Superclass
import { IpcSocketObject } from '../main'

// Types
import { IpcSocketPayload } from '..'

// Messages
import { IpcSocket, _reservedEvents } from '../types'




/**
 * @classdesc Object that represents a client connection to a IpcSocketServer.
 * @class
 * @augments IpcSocketObject
 * @category Libs
 * @subcategory IPC IpcSockets
 */
export class IpcSocketClient extends IpcSocketObject {

  protected _socket!: WebSocket | null
  protected _connected = false

  /**
   * Creates a new IpcSocketClient object.
   * @constructor
   * @param {number} port The port to connect to an already open IpcSocketServer.
   * @param {object} messages Allowed messages between server and client.
   */
  constructor(port: number, socket?: WebSocket) {

    super(port)

    this._timeout = 500
    // Connects to server
    this.connect(socket)

  }
  /**
   * Calls superclass unref method, then disconnects and tears down client.
   * @public
   */
  public unref(): void {

    super.unref()

    this.disconnect()

  }
  /**
   * Sends a message to the server.
   * @param {string} channel The name of the channel to send the message to.
   * @param {any} payload The data to send.
   * @param {function} callback A callback function called when the message has been received and treated by the server.
   */
  public send(channel: string, payload?: any | null, callback?: ((...args: any[]) => any)): void {

    if (callback) {
      // Listens to the response from server
      const handler = (response: any) => {
        callback({
          payload: response.payload,
          time: response.time
        })
        this.off(_reservedEvents.___RESPONSE, handler)
      }
      this.on(_reservedEvents.___RESPONSE, handler)
    }

    this._socket!.send(JSON.stringify({
      channel,
      payload
    }))

  }

  private connect(socket?: WebSocket) {

    // Connects to WebSocket server in main process
    this._socket = socket || new WebSocket(`ws://localhost:${this._port}`)

    // Adds WebSocket listeners
    this._socket.onopen = this.onOpen.bind(this)
    this._socket.onclose = this.onClose.bind(this)
    this._socket.onmessage = this.onMessage.bind(this)
    this._socket.onerror = this.onError.bind(this)

  }

  protected disconnect(): void {
    console.log('Client Disconnected')

    super.disconnect()
    this._connected = false

    // Removes WebSocket listeners
    this._socket!.onopen = null
    this._socket!.onclose = null
    this._socket!.onmessage = null
    this._socket!.onerror = null

    this._socket!.close()
    this._socket = null

  }

  private onOpen(event: Event): void {

    // Launch Heartbeat
    // TODO: timeout in options
    this.launchHeartbeat(this._timeout)

    this._connected = true

    if (this._listeners[IpcSocket.Client.Event.CONNECTED]) {
      this._listeners[IpcSocket.Client.Event.CONNECTED].forEach((listener: ((...args: any[]) => any)) => {
        listener({
          channel: IpcSocket.Client.Event.CONNECTED,
          time: event.timeStamp
        })
      })
    }

  }

  private onClose(event: Event): void {

    this._connected = false

    if (this._listeners[IpcSocket.Client.Event.DISCONNECTED]) {
      this._listeners[IpcSocket.Client.Event.DISCONNECTED].forEach((listener: ((...args: any[]) => any)) => {
        listener({
          channel: IpcSocket.Client.Event.DISCONNECTED,
          time: event.timeStamp
        })
      })
    }

  }

  private onError(event: Event): void {
    if (this._listeners[IpcSocket.Event.ERROR]) {

      this._listeners[IpcSocket.Event.ERROR].forEach((listener: ((...args: any[]) => any)) => {

        listener(event)

      })
    }
  }

  private onMessage(message: MessageEvent): void {

    const content = JSON.parse(message.data)
    const channel = content.channel

    if (channel === _reservedEvents.___PING) {
      this.onPing()
      return
    } else if (channel === _reservedEvents.___PONG) {
      this.onPong()
      return
    }

    const payload = content.payload
    const time = message.timeStamp

    if (this._listeners[channel]) {
      this._listeners[channel].forEach((listener: ((...args: any[]) => any)) => {
        listener({
          channel,
          payload,
          time
        } as IpcSocketPayload)
      })
    }
  }

  private onPing() {
    // Answers the server
    this.send(_reservedEvents.___PONG)

  }

  private onPong() {
    // Clear disconnection timeout
    clearTimeout(this._pong)

  }

  private launchHeartbeat(milliseconds: number) {

    this._heartbeat = setInterval(() => {
      // Wait for a pong from server for 'milliseconds'
      this.waitForPong(milliseconds)
      // Sends ping every 'milliseconds'
      this.send(_reservedEvents.___PING)
    }, milliseconds)

  }

  private waitForPong(milliseconds: number) {

    this._pong = setTimeout(() => {
      console.log('NO PONG?')
      this.disconnect()
    }, milliseconds)

  }

  public get connected() {
    return this._connected
  }

}